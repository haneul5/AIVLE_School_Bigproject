import '../App.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    let navi = useNavigate()
    return (
        <> 
        < div className = "navi" > <div className="loginjoin-btn-box">
            <div
                className="loginjoin-btn"
                onClick={() => {
                    navi("/");
                }}>Home</div>
            <div className="loginjoin-btn">Join</div>
        </div>
    </div>
    <div className='login-box'>
        <div className='login-text'>Login</div>
        <div className='form-box'>
            <div className='form-box01'>
                <div className='form-text'>ID</div>
                <input type='text' className='form-field' placeholder='아이디' id='id'></input>
                <div className='form-text'>Password</div>
                <input type='password' className='form-field' placeholder='비밀번호' id='pw'></input>
            </div>
            <div className='form-box02'>
                <button onClick={()=>{
                    console.log(document.querySelectorAll('.form-box01 input')[0].value,document.querySelectorAll('.form-box01 input')[1].value);
                    // axios.post('http://127.0.0.1:8000/test',
                    //     {
                    //         id : document.querySelectorAll('.form-box01 input')[0].value,
                    //         pwd : document.querySelectorAll('.form-box01 input')[1].value
                    //     }
                    // )
                    // .then(res => console.log(res))
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/post',
                        data: {
                            'id' : document.querySelectorAll('.form-box01 input')[0].value,
                            'pwd' : document.querySelectorAll('.form-box01 input')[1].value
                        }

                    }).then(res => res === 'login' ? navi('/') : console.log('로그인 실패'))
                }}>Login</button>
                <button>Create account</button>
            </div>
        </div>
    </div>
</>
    );
}

export default Login;