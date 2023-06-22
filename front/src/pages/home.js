import styled, { keyframes, css } from "styled-components";
import backgroundImg from '../image/video.png';
import backgroundImg02 from '../image/chat.png';
import backgroundImg03 from '../image/keyword.png';
import logoImg from '../image/logo.png';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const show = keyframes`
    0% {
        top: 100%;
        transform: translate3d(0,50%,0);
        opacity: 0;
    }
    100% {
        top: 0%;
        transform: translateZ(0);
        opacity: 1;
    }
`;
const UploadBox = styled.div`
    width: 30%;
    height: 8%;
    border-radius: 30px;
    background-color: #FD6F22;
    position: fixed;
    left: 33%;
    bottom: 3%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 130%;
    &:hover {
        cursor: pointer;
        background-color: #D94925;
    }
`

const Wrapper = styled.div`
    height: 300vh;
    overflow-x: hidden;
    font-family: 'Nanum Gothic', sans-serif;
    user-select: none;
`
const Box = styled.div`
    width: 100%;
    height: ${(props) => props.height};
    background-color: black;
    display: flex;
    justify-content: center;
    overflow: hidden;
`
const ImgWrapper = styled.div`
    width: 40%;
    height: 100%;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-position: center;
    background-size: 70;
    background-repeat: no-repeat;
`

const TextContainer = styled.div`
    width: 50%;
    heigth: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${({ animate }) =>
    animate &&
    css`
      animation: ${show} 2s;
    `}
`

const TextBox01 = styled.div`
    width: 100%;
    height: 20%;
    font-size: 400%;
    color: white;
    font-weight: 800;
`
const TextBox02 = styled.div`
    width: 100%;
    height: 20%;
    font-size: 200%;
    color: #A5A5A5;
`
const NaviBar = styled.div`
    width: 100%;
    height: 7vh;
    display: flex;
    justify-content: space-around; 
    align-items: center;
    background-color: black;
`
const Logo = styled.div`
    width: 10%;
    height: 100%;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
    margin-top: 2vh;
`
const LoginBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7%;
    height: 70%;
    background-color: #FD6F22;
    border-radius: 5px;
    color: white;
    margin-top: 2vh;
    &:hover {
        cursor: pointer;
        background-color: #D94925;
    }
`
const Home = () => {
    const navi = useNavigate();
    const textContainersRef = useRef([]); // TextContainer 요소들을 참조할 배열
    const [first, setFirst] = useState(false);
    const [seccond, setSeccond] = useState(false);
    const [third, setThird] = useState(false);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
  
      // 특정 스크롤 위치에 도달하면 isVisible 상태를 true로 설정
      if (scrollTop < 300) {
        setFirst(true);
        setSeccond(false);
        setThird(false);
      }else if (scrollTop > 300 && scrollTop < 700){
        setFirst(false);
        setSeccond(true);
        setThird(false);
      }else if (scrollTop > 700){
        setFirst(false);
        setSeccond(false);
        setThird(true);
      }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    


    return(
        <>
        <Wrapper>
            <UploadBox>비디오 업로드 하기</UploadBox>
            <NaviBar><Logo imageUrl={logoImg}/><LoginBox onClick={()=>{
                navi('/login')
            }}>로그인</LoginBox></NaviBar>
            <Box height='93vh' className="box">
                <ImgWrapper imageUrl={backgroundImg}/>
                <TextContainer className="text" ref={textContainersRef.current[0]} animate={first}>
                <TextBox01>동영상을 업로드 하세요</TextBox01>
                <TextBox02>업로드 된 동영상에 관한 질문을 하면<br/>gpt의 답을 들을 수 있어요</TextBox02>
                </TextContainer>
                </Box>
            <Box height='100vh' className="box">
                <TextContainer className="text" ref={textContainersRef.current[1]} animate={seccond}>
                <TextBox01>나의 대화를 기록</TextBox01>
                <TextBox02>회원가입을 하면<br/>대화를 기록 할 수 있어요</TextBox02>
                </TextContainer>
                <ImgWrapper imageUrl={backgroundImg02}/>
                </Box>
            <Box height='100vh' className="box">
            <ImgWrapper imageUrl={backgroundImg03}/>
                <TextContainer className="text" ref={textContainersRef.current[2]} animate={third}>
                <TextBox01>대화 요약 기능</TextBox01>
                <TextBox02>대화의 키워드를 요약하여<br/>개인이 소장 할 수 있어요</TextBox02>
                </TextContainer>
            </Box>
        </Wrapper>
        </>
    )
}

export default Home;