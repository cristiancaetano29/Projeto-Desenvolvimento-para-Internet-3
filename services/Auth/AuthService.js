import axios from "axios"

const UrlLogin = "localhost:5035/api/Login/"

    const login = (username, senha) => {
        return axios.post(UrlLogin + "Login", {
            username,
            senha
        })
        .then((resp) => {
            console.log("response: " + JSON.stringify(resp.data.token))
            if(resp.data.token)
                localStorage.setItem("User", JSON.stringify(resp.data))
            return resp.data
        })
    }

    const logout = () => {
        localStorage.removeItem("User")
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("U"))
    }

    const AuthService = {
        login,
        logout,
        getCurrentUser,
    }

export default AuthService