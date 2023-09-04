import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"

const Register = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setrepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {

        e.preventDefault();

        if ([name, surname, email, password, repetirPassword].includes('')) {

            setAlerta({

                msg: 'Todos los campos son obligatorios',
                error: true

            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({

                msg: 'Los passwords no son iguales',
                error: true

            })
            return
        }

        if (password.length < 6) {
            setAlerta({

                msg: 'El Password es muy corto, agrega como mínimo 6 caracteres',
                error: true

            })
            return
        }

        setAlerta({})

        try {

            const { data } = await clienteAxios.post(`/users`,

                {
                    name, surname, email, password
                })

            setAlerta({

                msg: data.msg,
                error: false
            })

            setName('')
            setSurname('')
            setEmail('')
            setPassword('')
            setrepetirPassword('')


        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }

    }

    const { msg } = alerta

    return (


        <>

            <h1 className="text-sky-600 font-black text-5xl text-center uppercase">Crea tu Cuenta</h1>

            {msg && <Alert alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

                <div className="my-5">

                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="Nombre">Nombre</label>

                    <input
                        id="Nombre"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>



                <div className="my-5">

                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="Apellido">Apellido</label>

                    <input
                        id="Surname"
                        type="text"
                        placeholder="Tu Apellido"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                </div>


                <div className="my-5">

                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>


                <div className="my-5">

                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">

                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2">Repetir Password</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Repetir Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        onChange={e => setrepetirPassword(e.target.value)} />

                </div>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-sky-700 w-full py-3 mb-5 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors" />


            </form>

            <nav className="lg:flex lg:justify-between">

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/">

                    ¿Ya tienes una cuenta? Inicia Sesión

                </Link>



                <Link

                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/password-recover">

                    ¿Olvidé Password?


                </Link>


            </nav>


        </>

    )
}

export default Register