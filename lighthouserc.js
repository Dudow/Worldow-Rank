module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "yarn start",
    },
    asserts: {
      preset: "lighthouse:recomended",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}
