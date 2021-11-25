import React from "react";
import ArticleIcon from "@mui/icons-material/Article";

const SolidityExtIcon = () => (
  <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2.5e-7 -.0038283)" fill="#0288d1">
      <path d="m5.7473 14.05 6.2533 8.6104 6.252-8.6104-6.2533 3.8072z" />
      <path d="m11.999 1.3471-6.252 10.486 6.252 3.8072 6.2533-3.8072z" />
      <rect x=".8969" y=".69165" width="0" height="0" />
    </g>
  </svg>
);

const JsonExtIcon = () => (
  <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m5 3h2v2h-2v5a2 2 0 0 1 -2 2 2 2 0 0 1 2 2v5h2v2h-2c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0 -2 -2h-1v-2h1a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0 -2 2v4a2 2 0 0 1 -2 2h-2v-2h2v-5a2 2 0 0 1 2 -2 2 2 0 0 1 -2 -2v-5h-2v-2h2m-7 12a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1m-4 0a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1m8 0a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1z"
      fill={"#fbc02d"}
    />
  </svg>
);

const PythonExtIcon = () => (
  <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-1.5418e-7 -.00046865)">
      <g>
        <path
          d="m9.8594 2.0009c-1.58 0-2.8594 1.2794-2.8594 2.8594v1.6797h4.2891c.39 0 .71094.57094.71094.96094h-7.1406c-1.58 0-2.8594 1.2794-2.8594 2.8594v3.7812c0 1.58 1.2794 2.8594 2.8594 2.8594h1.1797v-2.6797c0-1.58 1.2716-2.8594 2.8516-2.8594h5.25c1.58 0 2.8594-1.2716 2.8594-2.8516v-3.75c0-1.58-1.2794-2.8594-2.8594-2.8594zm-.71875 1.6094c.4 0 .71875.12094.71875.71094s-.31875.89062-.71875.89062c-.39 0-.71094-.30062-.71094-.89062s.32094-.71094.71094-.71094z"
          fill="#3c78aa"
        />
        <path
          d="m17.959 7v2.6797c0 1.58-1.2696 2.8594-2.8496 2.8594h-5.25c-1.58 0-2.8594 1.2696-2.8594 2.8496v3.75a2.86 2.86 0 0 0 2.8594 2.8613h4.2812a2.86 2.86 0 0 0 2.8594 -2.8613v-1.6797h-4.291c-.39 0-.70898-.56898-.70898-.95898h7.1406a2.86 2.86 0 0 0 2.8594 -2.8613v-3.7793a2.86 2.86 0 0 0 -2.8594 -2.8594zm-9.6387 4.5137-.0039.0039c.01198-.0024.02507-.0016.03711-.0039zm6.5391 7.2754c.39 0 .71094.30062.71094.89062a.71 .71 0 0 1 -.71094 .70898c-.4 0-.71875-.11898-.71875-.70898s.31875-.89062.71875-.89062z"
          fill="#fdd835"
        />
      </g>
    </g>
  </svg>
);

const FallbackIcon = () => <ArticleIcon />;

const ICON_RECORDS: Record<string, () => JSX.Element> = {
  fallback: FallbackIcon,
  ".sol": SolidityExtIcon,
  ".json": JsonExtIcon,
  ".py": PythonExtIcon,
};

const ExtIcon = ({ ext }: { ext: string }) => {
  const Icon = ICON_RECORDS[ext] || ICON_RECORDS.fallback;
  return <Icon />;
};

export default ExtIcon;
