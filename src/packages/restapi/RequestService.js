import * as React from "react";

export class RequestService extends React.Component {
    constructor(props) {
        super(props);
        this.requestSettings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({example: 'data'})
        }
    }

    async sendPostRequest(requestBody) {
        return await fetch(
            'http://' + this.getHost() + ':' + this.getPort() + '/' + requestBody,
            this.requestSettings)
            .then((response) => {
                if (response.ok)
                    return response.json()
                else
                    return {
                        code: 0,
                        message: "Server is not available",
                        data: []
                    }
            })
            .catch((err) => {
                console.log("Error: " + err.message)
                console.log("Response: " + err.response);
            })
    }

    getHost() {
        return process.env.PHP_API_HOST
    }

    getPort() {
        return process.env.PHP_API_PORT
    }
}