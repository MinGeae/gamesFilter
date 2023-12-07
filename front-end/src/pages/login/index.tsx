import { useState } from "react";
import request from "../../utils/request";
import "./index.css";
import { setAccessToken } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [flag, setFlag] = useState(false);

  function getLogin() {
    if (username && password) {
      request({
        method: "POST",
        url: "/auth/login",
        params: { username, password },
      }).then(({ data }) => {
        setAccessToken(data.access_token);
        navigate("/");
      });
    } else {
      setFlag(true);
    }
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <input
          placeholder="账号"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        ></input>
        <input
          placeholder="密码"
          value={password}
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></input>
        {flag && <span className="error-tips">账号或密码错误</span>}
        <button onClick={getLogin}>登录</button>
      </div>
    </div>
  );
}

export default Login;
