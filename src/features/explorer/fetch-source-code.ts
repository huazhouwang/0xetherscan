import { ChainID } from "../global/slice";
import { delayPromise } from "../../utils/promise-plus";

const API_HOST: Record<ChainID, string> = {
  eth: "https://api.etherscan.io/api",
  bsc: "https://api.bscscan.com/api",
};

type FetchSourceCode = {
  name: string;
  address: string;
  files: Record<string, string>;
};

const fetchFromEtherscan = async (
  apiHost: string,
  address: string,
  apikey?: string
): Promise<FetchSourceCode> => {
  const params: Record<string, string> = {
    module: "contract",
    action: "getsourcecode",
    address,
  };
  apikey && (params.apikey = apikey);

  const url = `${apiHost}?${new URLSearchParams(params).toString()}`;
  const resp = await fetch(url, {
    mode: "cors",
  });

  if (!resp.ok) {
    const textResp = await resp.text();
    throw new Error(
      `Got error response from ${apiHost}. statusCode: ${resp.status}, response: ${textResp}`
    );
  }

  const jsonResp = await resp.json();

  if (
    Number(jsonResp.status) !== 1 ||
    !Array.isArray(jsonResp.result) ||
    jsonResp.result.length <= 0
  ) {
    throw new Error(
      `Got invalid response from ${apiHost}. response: ${JSON.stringify(
        jsonResp
      )}`
    );
  }

  const [realItem] = jsonResp.result;
  const contractName = realItem.ContractName;
  const proxy =
    Number(realItem.Proxy) === 1 &&
    realItem.Implementation &&
    realItem.Implementation.toLowerCase() !== address.toLowerCase();

  const wrapper: <T>(func: () => Promise<T>) => Promise<T> = apikey
    ? (f) => f()
    : (f) => delayPromise(5000).then(f);

  const implementation = proxy
    ? await wrapper(() =>
        fetchFromEtherscan(apiHost, realItem.Implementation, apikey)
      )
    : undefined;

  const source = normalize(realItem.SourceCode);
  let files: Record<string, string>;
  if (typeof source === "string") {
    const ext = realItem.CompilerVersion.includes("vyper") ? "py" : "sol";
    files = { [`${contractName}.${ext}`]: source };
  } else {
    files = source;
  }

  if (implementation) {
    const implDirName = `implementation@${implementation.address}`;
    const flatImplFiles = Object.entries(implementation.files).reduce(
      (acc, [fileName, content]) => {
        acc[`${implDirName}/${fileName}`] = content;
        return acc;
      },
      {} as Record<string, string>
    );

    Object.assign(files, flatImplFiles);
  }

  return {
    name: contractName,
    address: address.toLowerCase(),
    files,
  };
};

const normalize = (source: string): string | Record<string, string> => {
  if (source.startsWith("{{") && source.endsWith("}}")) {
    try {
      const modifyContent = source.slice(1, -1).replaceAll("\r\n", "");
      const payload: {
        sources: { [p: string]: { content: string } };
        settings: never;
      } = JSON.parse(modifyContent);

      const multiSource = Object.entries(payload.sources).reduce(
        (acc, [fileName, { content }]) => {
          acc[fileName] = content;
          return acc;
        },
        {} as Record<string, string>
      );

      multiSource["settings.json"] = JSON.stringify(
        payload.settings,
        undefined,
        2
      );

      return multiSource;
    } catch (e) {
      console.error("Error in normalizing source code. error: ", e);
    }
  }

  return source;
};

const FETCH_FUNC: Record<ChainID, typeof fetchFromEtherscan> = {
  eth: fetchFromEtherscan,
  bsc: fetchFromEtherscan,
};

export default (
  chainId: ChainID,
  address: string,
  apikey?: string
): Promise<FetchSourceCode> => {
  const apiHost = API_HOST[chainId];
  const func = FETCH_FUNC[chainId];
  return func(apiHost, address, apikey);
};

export type { ChainID, FetchSourceCode };
