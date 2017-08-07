import AV from 'leancloud-storage'
var APP_ID = '9HR3PfJcM1Xb8tHiDbIPvhlx-gzGzoHsz';
var APP_KEY = 'eJdbaCMiwbhBo93LJ2KoN8CP';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(email,username,password,successFn,errorFn){
  var user = new AV.User()//新建AVUser 对象实例
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
      successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)

  })
  return undefined
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username,password).then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
     id:AVUser.id,
     ...AVUser.attributes  
  }
 
}
