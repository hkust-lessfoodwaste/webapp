import axios from "axios";
import Router from "@/router/index";
import { message } from "ant-design-vue";

const server = "https://smart-canteen-huatm1.herokuapp.com/";
const axiosRequest = (
  method,
  url,
  data,
  auth = false,
  headers = { "Content-Type": "application/json" }
) => {
  return new Promise((resolve, reject) => {
    if (auth) {
      let appStorage = JSON.parse(localStorage.getItem("food_minus_app"));
      if (!appStorage || !appStorage.itsc || !appStorage.token) {
        Router.push({
          path: "/login",
        });
        return;
      } else {
        if (data instanceof FormData) {
          data.append("itsc", appStorage.itsc);
          data.append("token", appStorage.token);
        } else {
          data["itsc"] = appStorage.itsc;
          data["token"] = appStorage.token;
        }
      }
    }
    if (method === "post") {
      axios
        .post(server + url, data, headers)
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Unable to locate user") {
              message.error(res.data.error);
              Router.push({
                path: "/login",
              });
            } else {
              message.error(res.data.error);
            }
          }
          resolve(res.data);
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else if (method === "get") {
      axios
        .get(server + url, { params: data })
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Unable to locate user") {
              message.error(res.data.error);
              Router.push({
                path: "/login",
              });
            } else {
              message.error(res.data.error);
            }
          }
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message);
        });
    }
  });
};

export default axiosRequest;
