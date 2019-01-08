import { Injectable } from "@karrot/core";

@Injectable()
export class Test {
    public doLog(): Test {
        console.log('log');

        return this;
    }
}
