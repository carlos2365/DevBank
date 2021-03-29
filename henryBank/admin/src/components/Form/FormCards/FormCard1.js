import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrent, returnCurrent } from '../../../stores/Form/actions/form_actions'
import { postForm } from '../../../controllers/formControllers'
import logo from '../../../images/Negro.svg'

import './styles.css'

const FormCard1 = (props) => {
    const [info, setInfo] = useState({
        name: '',
        lastName: '',
        phone: ''
    })

    const [errs, setErrs] = useState({}) 

    const validate = (info) => {
        let errors = {}
        if(!info.name){
            errors.name = 'Name is empty'
        }
        if(!info.lastName){
            errors.lastName = 'lastName is empty'
        }
        if(!info.phone){
            errors.phone = 'Phone is empty'
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

    const handlerPrevious = (e) => {
        e.preventDefault()
        dispatch(returnCurrent())
    }

    return (
        <div className='cnt'>
            <header>
                <img src={logo} />
            </header>
            <div className="progress-bar">
                <div className="step active">
                    <p className='active'>Email</p>
                    <div className="bullet active">
                        <span>1</span>
                    </div>
                    <div className="check fas fa-check active">
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
                            Basic Info:</div>
                        <div className='field'>
                            <div className='label'>
                                First Name</div>
                            <input type='text' name='name' onChange={handlerInput} value={info.name} autocomplete="off" />
                        </div>
                        <div className='field'>
                            <div className='label'>
                                Last Name</div>
                            <input type='text' name='lastName' onChange={handlerInput} value={info.lastName} autocomplete="off" />
                        </div>
                        <div className='field'>
                            <div className='label'>
                                Phone</div>
                            <input type='tel' name='phone' onChange={handlerInput} value={info.phone} autocomplete="off" />
                        </div>
                        <div class="field btns">
                            <button type='submit' class="prev-1 prev" onClick={(e) => handlerPrevious(e)}>Previous</button>
                            {Object.keys(errs).length === 0 ?
                                <button type='submit' class="next-1 next" onClick={(e) => handlerNext(e)}>Next</button>:
                                <button type='submit' class="next-1 next disabled" disabled>Next</button>}
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default FormCard1
