import React from 'react'
import '../styles/Login.css'
const Login = () => {
  return (
    <div className="login-main">

      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true" style={{ textAlign: 'center' }}>Iniciar sesion</label>
          <input type="text" name="txt" placeholder="User name" required="" />
          {/* <input type="email" name="email" placeholder="Email" required="" /> */}
          <input type="password" name="pswd" placeholder="Password" required="" />
          <button>Ingresar</button>
        </form>
      </div>

      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" placeholder="Email" required="" />
          <input type="password" name="pswd" placeholder="Password" required="" />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login