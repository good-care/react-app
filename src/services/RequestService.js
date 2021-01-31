import * as React from "react";

export class RequestService extends React.Component {

    getRequestSettings(body, token = ''){
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        }
    }

    async sendPostRequest(requestAddress, requestBody = {}, token = '') {
        return await fetch(
            'http://' + this.getHost() + ':' + this.getPort() + '/' + requestAddress,
            this.getRequestSettings(requestBody, token))
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

//Singleton
export const requestService = new RequestService();