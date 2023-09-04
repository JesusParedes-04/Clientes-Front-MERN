import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"


const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [PasswordModificado, setPasswordModificado] = useState(false)


    const params = useParams();
    const { token } = params

    useEffect(() => {

       

        const comprobarToken = async () => {

            try {
                await clienteAxios(`/users/recover-password/${token}`)
                setTokenValido(true)

            } catch (error) {
                setAlerta({

                    msg: error.response.data.msg,
                    error: true

                })
            }
        }
        comprobarToken()
    }, [])


    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({


                msg: 'El password debe ser minimo de 6 caracteres',
                error: true

            })
        }
        try {

            const url = `users/recover-password/${token}`

            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            });

            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta


    return (

        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize text-center">Restablecer Password</h1>
            {msg && <Alert alerta={alerta} />}
            {tokenValido && (
                <form className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}>




                    <div className="my-5">

                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="email">Nuevo Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />

                    </div>


                    <input
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-sky-700 w-full py-3 mb-5 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors" />


                </form>
            )}

            {PasswordModificado && (

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/">

                    Inicia Sesión

                </Link>


            )}

        </>

    )
}

export default NewPassword