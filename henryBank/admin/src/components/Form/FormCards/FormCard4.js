import React, { useState, useEffect } from 'react'
import { oneUser } from '../../../controllers/userControllers'
import { useDispatch } from 'react-redux'
import { removeCurrent } from '../../../stores/Form/actions/form_actions'
import logo from '../../../images/Negro.svg'

import './styles.css'

const FormCard4 = (props) => {
    const [user, setUser] = useState({
        name: '',
        lastName: ''
    })

    const dispatch = useDispatch()

    const handlerAgain = (e) => {
        e.preventDefault()
        dispatch(removeCurrent())
    }

    useEffect(() => {
        oneUser(parseInt(props.userId))
            .then((data) => {
                if(data){
                    setUser({
                        ...user,
                        name: data.data.name,
                        lastName: data.data.lastName
                    })
                }
            })
    }, [props.userId])


    return (
        <div className='cnt'>
            <header>
                <img src={logo} />
            </header>
            <div class="progress-bar">
                <div className="step active">
                    <p className='active'>Email</p>
                    <div className="bullet active">
                        <span>1</span>
                    </div>
                    <div className="check fas fa-check active">
                    </div>
                </div>
                <div class="step active">
                    <p className='active'>Basic</p>
                    <div class="bullet active">
                        <span>2</span>
                    </div>
                    <div class="check fas fa-check active">
                    </div>
                </div>
                <div class="step active">
                    <p className='active'>Documents</p>
                    <div class="bullet active">
                        <span>3</span>
                    </div>
                    <div class="check fas fa-check active">
                    </div>
                </div>
                <div class="step active">
                    <p className='active'>Address</p>
                    <div class="bullet active">
                        <span>4</span>
                    </div>
                    <div class="check fas fa-check active">
                    </div>
                </div>
            </div>
            <div className='form-finish'>
                {user.name.length > 2 ? <p className='titlep'>CONGRATULATIONS</p>: <p className='titlep'>Something was wrong</p>}
                {user.name.length > 2 ? <p className='subtitle'>{user.name} {user.lastName}, Now open your app and enjoy it</p>: <p className='subtitle'>But it is not your fault</p>}
                {user.name.length > 2 ? <p className='subtitle'>Thanks</p> : 
                    <button type='submit' className='button' onClick={(e) => handlerAgain(e)}>Try Again</button>
                }
            </div>

        </div>
    )
}

export default FormCard4
