import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrent } from '../../../stores/Form/actions/form_actions'
import { postForm } from '../../../controllers/formControllers'
import logo from '../../../images/Negro.svg'

import './styles.css'

const FormCard0 = (props) => {
    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirm: ''
    })

    const [errs, setErrs] = useState({}) 

    const validate = (info) => {
        let errors = {}
        if(!info.email){
            errors.email = 'email is empty'
        }else if(!/\S+@\S+\.\S+/.test(info.email)){
            errors.email = 'it is not an email'
        }
        if(!info.password){
            errors.password = 'password is empty'
        }else if(!/(?=.*[0-9])/.test(info.password)){
            errors.password = 'Password must have 9 caracters'
        }else if(info.password === info.confirm){
            errors.password = 'Password is invalid'
        }
        return errors
    }

    const dispatch = useDispatch()

    const handlerInput = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        setErrs(validate(info))
    }


    const handlerNext = (e) => {
        e.preventDefault()
        dispatch(changeCurrent())
        postForm(parseInt(props.userId), info)
    }

    return (
        <div className='cnt'>
            <header>
                <img src={logo} />
            </header>
            <div className="progress-bar">
                <div className="step">
                    <p>Email</p>
                    <div className="bullet">
                        <span>1</span>
                    </div>
                    <div className="check fas fa-check">
                    </div>
                </div>
                <div className="step">
                    <p>Basic</p>
                    <div className="bullet">
                        <span>2</span>
                    </div>
                    <div className="check fas fa-check">
                    </div>
                </div>
                <div className="step">
                    <p>Documents</p>
                    <div className="bullet">
                        <span>3</span>
                    </div>
                    <div className="check fas fa-check">
                    </div>
                </div>
                <div className="step">
                    <p>Address</p>
                    <div className="bullet">
                        <span>4</span>
                    </div>
                    <div className="check fas fa-check">
                    </div>
                </div>
            </div>
            <div className='form-outer'>
                <form action='#' >
                    <div className='page slide-page'>
                        <div className='title'>
                            @:</div>
                        <div className='field'>
                            <div className='label'>
                                Email</div>
                            <input type='email' name='email' onChange={handlerInput} value={info.email} autocomplete="off" />
                        </div>
                        <div className='field'>
                            <div className='label'>
                                Password</div>
                            <input type='password' name='password' onChange={handlerInput} value={info.password} autocomplete="off" />
                        </div>
                        <div className='field'>
                            <div className='label'>
                                Confirm Password </div>
                            <input type='password' name='confirm' onChange={handlerInput} value={info.confirm} autocomplete="off" />
                        </div>
                        <div className='field'>
                            {Object.keys(errs).length === 0 ?
                                <button type='submit' className='firstNext next' onClick={(e) => handlerNext(e)}>Next</button>:
                                <button  disabled>{errs.email || errs.password}</button>
                               }
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default FormCard0