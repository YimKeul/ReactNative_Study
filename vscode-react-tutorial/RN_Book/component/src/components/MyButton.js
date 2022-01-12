import React from 'react'
//react를 실행하기 위해선 반드시 작성해야 하는 코드

import { TouchableOpacity  ,Text} from 'react-native'
//RN에서 제공하는 컴포넌트 추가

import PropTypes from 'prop-types'

const MyButton = props => {
  console.log(props)
  return (
    <TouchableOpacity style={
      {
        backgroundColor:"#3498db",
        padding: 16,
        margin:10,
        borderRadius:8
      }
    }
    onPress = {
      () => props.onPress()
    }
    >
      <Text style={{fontSize: 24 , color : "white"}}>{props.children||props.title}</Text>
    </TouchableOpacity>
  )
}
//디폴트일때 자동 설정해주는 값
// MyButton.defaultProps = {
//   title : "Button"
// }

MyButton.propTypes = {
  title : PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}


export default MyButton