import {inject, injectable} from "tsyringe";

@injectable()
export class FuzzyMatcher {
    match(needle:string, target:string) {
        if (needle === '') {
            return true;
        }

        if (target === '') {
            return false;
        }

        const needleCh = needle.substr(0, 1);
        const needleIdx = target.indexOf(needleCh);

        if (needleIdx < 0) {
            return false;
        }

        return this.match(needle.substr(1), target.substr(needleIdx + 1));
    }
}