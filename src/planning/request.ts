import interfaces from "../interfaces/interfaces";

import guid from "../utils/guid";

class Request implements interfaces.Request {

    public guid: string;
    public serviceIdentifier: interfaces.ServiceIdentifier<any>;
    public parentContext: interfaces.Context;
    public parentRequest: interfaces.Request;
    public bindings: interfaces.Binding<any>[];
    public childRequests: interfaces.Request[];
    public target: interfaces.Target;

    public constructor(
        serviceIdentifier: interfaces.ServiceIdentifier<any>,
        parentContext: interfaces.Context,
        parentRequest: interfaces.Request,
        bindings: (interfaces.Binding<any>|interfaces.Binding<any>[]),
        target: interfaces.Target = null
    ) {

            this.guid = guid();
            this.serviceIdentifier = serviceIdentifier;
            this.parentContext = parentContext;
            this.parentRequest = parentRequest;
            this.target = target;
            this.childRequests = [];
            this.bindings = (Array.isArray(bindings) ? bindings : ((bindings) ? [bindings] : []));
    }

    public addChildRequest(
        serviceIdentifier: string,
        bindings: (interfaces.Binding<any>|interfaces.Binding<any>[]),
        target: interfaces.Target
    ): interfaces.Request {

            let child = new Request(
                serviceIdentifier,
                this.parentContext,
                this,
                bindings,
                target
            );
            this.childRequests.push(child);
            return child;
    }
}

export default Request;
