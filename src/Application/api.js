import GitHub from "github-api";

const defaults = {
    fetchRepoDetail(user, repo) {
        return new Promise((resolve, reject) => {
            (new GitHub())
                .getRepo(user, repo)
                .getDetails(function(err, detail) {
                    resolve(detail);
                });
        });
    },
};

export function make(override) {
    const clone = Object.assign(override, defaults);
    return Object.assign(clone, override);
}

export default defaults;
