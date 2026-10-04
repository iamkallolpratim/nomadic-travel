import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "node_modules/**", "scripts/**", "apps-script/**"] }];

export default config;
