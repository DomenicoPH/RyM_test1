import style from './Form.module.css'
import { useState } from 'react';
import validation from './validation';

const Form = (props) => {

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        setErrors(
            validation({
                ...userData,
                [name]: value
            })
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        props.login(userData)
    };

    return(
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>

                <div className={style.inputArea}>
                    <label className={style.label}>Username </label>
                    <input 
                        className={style.input} 
                        type="email" 
                        name='username'
                        value={userData.username}
                        onChange={handleChange}/>
                </div>

                <div className={style.inputArea}>
                    <label className={style.label}>Password </label>
                    <input 
                        className={style.input} 
                        type="password" 
                        name='password'
                        value={userData.password}
                        onChange={handleChange}/>
                </div>

                <button className={style.submit} type='submit'>Login</button>

            </form>
        </div>
    )
}

export default Form;