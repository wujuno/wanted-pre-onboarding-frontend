# 리액트 프리온보딩 사전 과제


## 배포

## 적용 기술
<strong>React, Typescript, react-router-dom(v6.10), MUI, emotion, axios</strong>

## 기능 설명
#### 가입페이지
<img src="https://i.ibb.co/g7VwXjp/i-Shot-2023-04-08-00-34-37.png" alt="i-Shot-2023-04-08-00-34-37" border="0">
<img src="https://i.ibb.co/zmmWj9s/i-Shot-2023-04-08-00-35-27.png" alt="i-Shot-2023-04-08-00-35-27" border="0">
<img src="https://i.ibb.co/LSznrdC/i-Shot-2023-04-08-00-36-04.png" alt="i-Shot-2023-04-08-00-36-04" border="0">

- 이메일, 비밀번호를 입력하여 가입할 수 있습니다.
- 이메일은 @ 포함, 비밀번호는 8자이상 조건을 만족해야 가입 버튼이 활성화 됩니다.
- 가입이 승인되면 알림과 함께 2.5초 뒤에 로그인 페이지로 이동합니다.
- 로그인 페이지로 이동시 가입시 입력했던 이메일과 비밀번호를 전달합니다.
- access_token이 있는 유저가 /signup으로 이동하면 /todo 페이지로 리다이렉트 됩니다.

#### 로그인 페이지
<img src="https://i.ibb.co/XxqXrcD/i-Shot-2023-04-08-00-36-24.png" alt="i-Shot-2023-04-08-00-36-24" border="0">
<img src="https://i.ibb.co/d5VykZx/i-Shot-2023-04-08-00-36-54.png" alt="i-Shot-2023-04-08-00-36-54" border="0">
<img src="https://i.ibb.co/2srHnbg/i-Shot-2023-04-08-01-08-34.png" alt="i-Shot-2023-04-08-01-08-34" border="0">

- 가입했던 이메일과 비밀번호를 입력하여 로그인 합니다.
- 가입페이지에서 가입 후 이동시 자동으로 이메일과 비밀번호가 입력되어 있는 상태입니다.
- 이메일은 @ 포함, 비밀번호는 8자 이상 조건을 만족해야 로그인 버튼이 활성화 됩니다.
- 가입한 회원이 아닐 경우 에러 알람이 뜨며, 가입페이지 링크가 함께 보여집니다.
- 이메일이 잘 못 입력됐을 경우 에러 알람이 뜹니다.
- 로그인이 승인되면 로컬스토리지에 access_token이 저장되며, todo 페이지로 이동합니다.
- access_token이 있는 유저가 /signin으로 이동하면 /todo 페이지로 리다이렉트 됩니다.


#### todo 페이지
<img src="https://i.ibb.co/wsp5mLh/i-Shot-2023-04-08-00-39-30.png" alt="i-Shot-2023-04-08-00-39-30" border="0">
<img src="https://i.ibb.co/5WqqKTg/i-Shot-2023-04-08-00-38-05.png" alt="i-Shot-2023-04-08-00-38-05" border="0">

- 로그인한 회원만 todo페이지로 이동할 수 있습니다.
- 입력 창에 할 일을 적고 추가 버튼을 누르면 할 일이 추가됩니다.
- 체크 버튼을 눌러 수행 여부를 체크할 수 있습니다.
- 수정 버튼을 눌러 할 일을 수정할 수 있습니다.
- 삭제 버튼을 눌러 할 일을 삭제할 수 있습니다.
- 새로고침 해도 todo-list는 남아 있습니다.
- access_token이 없는 유저가 /todo로 이동하면 /signin 페이지로 리다이렉트 됩니다.






## 구동 방법
git clone 후

 > npm install<br/>
 > npm start

<p>localhost:3000 브라우저 접속</p>
