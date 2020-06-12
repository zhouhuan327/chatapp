import styled from 'styled-components'

const StyledAvatar = styled.div`
    position: relative;

    .statusIcon{
        position:absolute;
        left:2px;
        top:1px;
        &::before{
            content:'';
            position:absolute;
            display:block;
            background-color:white;
            width: 8px;
            height:8px;
            border-radius:50%;
            transform:scale(2);
        }
        &::after{
            content:'';
            position:absolute;
            display:block;
            background-color:${({ theme }) => theme.green};
            width: 8px;
            height:8px;
            border-radius:50%
        }
    }
    .avatar-wrapper{
        width: 48px;
        height: 48px;
        border-radius:50%;
        overflow:hidden;
        > img{
            width: 100%;
            height:100%;
            object-fit:cover;
            object-position:center
        }
    }
`

export { StyledAvatar }