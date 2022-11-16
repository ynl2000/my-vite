# Vue3 & Vite 기반 포트폴리오 프로젝트

```
작성자 : 이용운
수정일 : 2022-11-16
```

## 디렉토리

```bash
 ├─ public
 |   └─  index.html                # vue화면 기본이 되는 html 
 ├─ src
 |   ├─ main.js                    # 프로젝트에서 가장 먼저 실행되는 파일. 다양한 설정, Import 등의 작업을 해당 파일에서 수행한다.
 |   ├─ App.vue                    # 프로젝트에서 가장 최상위 컴포넌트가 되는 파일이다. 해당 컴포넌트에서 다른 컴포넌트들을 추가하는 형태로 화면이 구성된다.
 |   └─ assets                     # 프로젝트 자산(css,js,img)와 같은 데이터가 들어가는 폴더
 |   |   └─ fonts                  # 폰트 모음 폴더
 |   |   |  ├─ notosansKr             # 디폴트    폰트 
 |   |   |  ├─ fontIcon               # 폰트아이콘 폰트 
 |   |   |  ├─ metlifeCircular        # 메트라이프 폰트 
 |   |   └─ images               # 이미지 파일 모음 폴더
 |   |   |  ├─ mob                 # 모바일 화면에서 사용하는 이미지 폴더
 |   |   |  |   └─ bg                 # background image로 사용 되는 이미지 폴더
 |   |   |  |   └─ default            # 어떤 폴더에 넣어야 할지 모를때 넣으면 되는 폴더
 |   |   |  |   └─ icon               # 아이콘 모음 이미지 폴더
 |   |   |  └─ pc                  # pc화면에서 사용하는 이미지 폴더
 |   |   |      └─ badge              # 뱃지 이미지 모음 폴더 
 |   |   |      └─ bg                 # background image로 사용 되는 이미지 폴더
 |   |   |      └─ button             # 버튼 이미지 폴더
 |   |   |      └─ character          # 캐릭터 이미지 모등 ㅁ폴더
 |   |   |      └─ default            # 어떤 폴더에 넣어야 할지 모를때 넣으면 되는 폴더
 |   |   |      └─ icon               # 아이콘 모음 이미지 폴더
 |   |   |      └─ lib                # 외부 라이브러리에 사용되는 이미지 폴더
 |   |   |  └─ svg                 # 폰트아이콘 모듈(fontagon) 빌드에 사용되는 svg 파일들을 저장하는 폴더
 |   |   └─ scss
 |   |       ├─ abstracts.scss      # 모든 scss 
 |   |       └─ abstracts                # 변수 및 scss 기능 관련 폴더
 |   |       |   ├─ color.scss             # 색상 관련 변수 scss
 |   |       |   ├─ mixins.scss            # 자주 쓰는 scss 문법 관련 scss
 |   |       |   ├─ reset.scss             # 리셋 scss
 |   |       |   └─ variable.scss          # 변수 관련 scss
 |   |       └─ base                     # 공통 모듈 관련 scss 폴더
 |   |           ├─ animation.scss         # 애니메이션 관련 scss
 |   |           ├─ common.scss            # 공통 관련 scss
 |   |           ├─ helpers.scss           # helper class 관련 scss
 |   |           └─ typography.scss        # 텍스트 가이드 관련 scss
 |   |       └─ lib                     # 라이브러리(외무 모듈) 관련 scss 폴더
 |   |       └─ pages                   # views의 단일 페이지에 사용되는 scss 폴더 (views - 페이지 명칭과 동일하게 사용)
 |   └─ components     # 콤포넌트 요소들 vue 페이지 관련 폴더
 |   |   └─ UI           # UI 콤포넌트(modal,tab 등) 페이지 관련 폴더
 |   |      └─ Tab.vue       
 |   |      └─ Modal.vue    
 |   |      └─ ...
 |   └─ router         # 라우터 관련 설정 폴더
 |   |   └─ router.js    # 페이지 전환 부분 설정 해주는 js
 |   └─ template         # 전체 페이지 템플릿에 관한 폴더 
 |   |   └─ EmptyTemplate.vue      # router-view 영역으로 구성된 탬플릿 
 |   |   └─ MainTempalte.vue       # header , router-view , footer 로 구성된 탬플릿
 |   |   └─ SubTemplate.vue        # header , visual , router-view , footer 로 구성된 탬플릿 
 |   |   └─ SubDetailTemplate.vue  # header , router-view , footer 로 구성된 탬플릿 
 |   |   └─ layout 
 |   |        └─ Header.vue     # 탬플릿에 들어가는 헤더 영역 
 |   |        └─ Footer.vue     # 탬플릿에 들어가는 푸터 영역 
 |   |        └─ Visual.vue     # 탬플릿에 들어가는 비주얼 영역 
 |   └─ translations      # 다국어 관련 설정 폴더
 |   |   ├─ en.json           # 영문 관련 다국어 json 파일  
 |   |   ├─ ko.json           # 한글 관련 다국어 json 파일  
 |   |   └─ ...
 |   └─ views           # 실제 라우터로 보여지는 화면들 vue 페이지 모음 폴더
 |   |   ├─ Main          # 메인 페이지 
 |   |   ├─ NotFoundPage  # 경로를 잘 못찾았을때 뜨는 페이지 
 |   |   └─ ...
 |   └─ vuex           # vuex 관련 설정 폴더
 |       └─ store.js     # 프로젝트 상태 관리 JS
 ├─ babel.config.js      # babel 세팅 설정 파일
 ├─ vue.config.js        # vue 세팅 설정 파일 (웹팩 세팅 포함)
 ├─ package.json         # 패키지 모듈 세팅 설정 파일
 └─ README.md            # readme 파일
```

## 프로젝트 의존성

- ### 메인 의존성

| 패키지 | 버전 | 설명 | 
| ------ | ------ | ------ |
| vue | 3.0.0 | JS FrameWork |

- ### 개발 의존성

| 패키지 | 버전 | 설명 | 
| ------ | ------ | ------ |
| node-sass | 6.0.1 | Node.js를 LibSass에 바인딩한 라이브러리  |