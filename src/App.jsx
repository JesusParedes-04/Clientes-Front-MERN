import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./paginas/Login"
import Register from "./paginas/Register"
import PasswordForget from "./paginas/PasswordForget"
import NewPassword from "./paginas/NewPassword"
import ConfirmAccount from "./paginas/ConfirmAccount"
import RutaProtegida from "./layouts/RutaProtegida"
import Clientes from "./paginas/Clientes"
import { AuthProvider } from "./context/AuthProvider"

function App() {

  return (
    < BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="password-recover" element={<PasswordForget />} />
            <Route path="password-recover/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>

          <Route path="/clients" element={<RutaProtegida />}>

            <Route index element={<Clientes/>}></Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
