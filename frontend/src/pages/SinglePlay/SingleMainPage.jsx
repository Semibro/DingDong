// React
import React, { useEffect, useState } from "react"
import styles from "./SingleMainPage.module.css"
import { motion } from "framer-motion"

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  ArriveAtom,
  ConfirmEnteringInstaAtom,
  ConfirmEnteringOtherRoomAtom,
  ConfirmEnteringPostBoxAtom,
  ConfirmEnteringPostOfficeAtom,
  ConfirmEnteringRankAtom,
  ConfirmEnteringRoomAtom,
  ConfirmEnteringStoreAtom,
  ConfirmEnteringTestAtom,
  ConfirmEnteringTwitterAtom,
  ConfirmEnteringWorldAtom,
  InstaPortalPositionAtom,
  InstaPortalVisibleAtom,
  OtherRoomPortalPositionAtom,
  OtherRoomPortalVisibleAtom,
  PostBoxPortalPositionAtom,
  PostBoxPortalVisibleAtom,
  PostOfficePortalPositionAtom,
  PostOfficePortalVisibleAtom,
  RankPortalPositionAtom,
  RankPortalVisibleAtom,
  RoomPortalPositionAtom,
  StorePortalPositionAtom,
  StorePortalVisibleAtom,
  TestPortalPositionAtom,
  TestPortalVisibleAtom,
  TwitterPortalPositionAtom,
  TwitterPortalVisibleAtom,
  WorldPortalPositionAtom,
  WorldPortalVisibleAtom,
} from "../../atom/SinglePlayAtom"
import { RoomPortalVisibleAtom } from "../../atom/SinglePlayAtom"

// Three.js 기본 세팅
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CustomCamera from "../../components/Default/CustomCamera"
import DirectionalLight from "../../components/Default/DirectionLight"
import Map from "../../components/Default/Map"

// Three.js
import Model from "../../components/Item/MainItems/Character"
import House from "../../components/Item/MainItems/tempItems/House"
import Spot from "../../components/Item/MainItems/tempItems/Spot"

// 각 건물 포탈
import DefaultPortal from "../../components/Item/MainItems/Portals/DefaultPortal"
import DefaultPortalRing from "../../components/Item/MainItems/Portals/DefaultPortalRing"

// React 컴포넌트
import ConfirmEnteringDefaultModal from "../../components/Modal/Confirm/ConfirmEnteringDefaultModal"
import PhysicsModel from "../../components/Item/MainItems/PhysicsModel"
import RankingModal from "../../components/Modal/Ranking/RankingModal"
import PostofficeCardBox from "../Postoffice/PostofficeCardBox"
import PostofficeSendLetter from "../Postoffice/PostofficeSendLetter"
import GuidePage from "../../components/UI/GuidePage"
import SingleHeader from "./SingleHeader"
import RankingInformation from "../../components/Modal/Ranking/RankingInformation"
import PostOfficeModal from "../../components/Modal/PostOffice/PostOfficeModal"
import DefaultModal from "../../components/Modal/Default/DefaultModal"

// Atom
import { DefaultPosition, DefaultZoom } from "../../atom/DefaultSettingAtom"
import {
  postofficeCardAtom,
  postofficeSendLetterAtom,
  finishPostofficeCardAtom,
  finishPostofficeSendLetterAtom,
} from "../../atom/PostAtom"
import {
  isPostOfficeVisibleAtom,
  isFinishPostOfficeVisibleAtom,
} from "../../atom/PostOfficeAtom"


const SingleMainPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  // 카메라 설정
  const setDefaultCameraPosition = useSetRecoilState(DefaultPosition)
  const setDefaultCameraZoom = useSetRecoilState(DefaultZoom)

  // 도착 여부
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 장소 입장 확인 여부
  const [confirmEnteringRoom, setConfirmEnteringRoom] = useRecoilState(
    ConfirmEnteringRoomAtom
  )
  const [confirmEnteringPostOffice, setConfirmEnteringPostOffice] =
    useRecoilState(ConfirmEnteringPostOfficeAtom)
  const [confirmEnteringStore, setConfirmEnteringStore] = useRecoilState(
    ConfirmEnteringStoreAtom
  )
  const [confirmEnteringOtherRoom, setConfirmEnteringOtherRoom] =
    useRecoilState(ConfirmEnteringOtherRoomAtom)
  // const [confirmEnteringWorld, setConfirmEnteringWorld] = useRecoilState(
  //   ConfirmEnteringWorldAtom
  // )
  const [confirmEnteringRank, setConfirmEnteringRank] = useRecoilState(
    ConfirmEnteringRankAtom
  )

  const [confirmEnteringTest, setConfirmEnteringTest] = useRecoilState(
    ConfirmEnteringTestAtom
  )

  const [confirmEnteringInsta, setConfirmEnteringInsta] = useRecoilState(
    ConfirmEnteringInstaAtom
  )

  const [confirmEnteringTwitter, setConfirmEnteringTwitter] = useRecoilState(
    ConfirmEnteringTwitterAtom
  )

  const [confirmEnteringPostBox, setConfirmEnteringPostBox] = useRecoilState(
    ConfirmEnteringPostBoxAtom
  )

  // 포탈 생성 여부
  const [roomPortalVisible, setRoomPortalVisible] = useRecoilState(
    RoomPortalVisibleAtom
  )
  const [postOfficePortalVisible, setPostOfficePortalVisible] = useRecoilState(
    PostOfficePortalVisibleAtom
  )
  const [storePortalVisible, setStorePortalVisible] = useRecoilState(
    StorePortalVisibleAtom
  )
  const [otherRoomPortalVisible, setOtherRoomPortalVisible] = useRecoilState(
    OtherRoomPortalVisibleAtom
  )
  // const [worldPortalVisible, setWorldPortalVisible] = useRecoilState(
  //   WorldPortalVisibleAtom
  // )
  const [rankPortalVisible, setRankPortalVisible] = useRecoilState(
    RankPortalVisibleAtom
  )
  const [testPortalVisible, setTestPortalVisible] = useRecoilState(
    TestPortalVisibleAtom
  )
  const [instaPortalVisible, setInstaPortalVisible] = useRecoilState(
    InstaPortalVisibleAtom
  )
  const [twitterPortalVisible, setTwitterPortalVisible] = useRecoilState(
    TwitterPortalVisibleAtom
  )

  const [postBoxPortalVisible, setPostBoxPortalVisible] = useRecoilState(
    PostBoxPortalVisibleAtom
  )

  // 포탈 위치
  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom)
  const postOfficePortalPosition = useRecoilValue(PostOfficePortalPositionAtom)
  const storePortalPosition = useRecoilValue(StorePortalPositionAtom)
  const otherRoomPortalPosition = useRecoilValue(OtherRoomPortalPositionAtom)
  // const worldPortalPosition = useRecoilValue(WorldPortalPositionAtom)
  const rankPortalPosition = useRecoilValue(RankPortalPositionAtom)
  const testPortalPosition = useRecoilValue(TestPortalPositionAtom)
  const instaPortalPosition = useRecoilValue(InstaPortalPositionAtom)
  const twitterPortalPosition = useRecoilValue(TwitterPortalPositionAtom)
  const postBoxPortalPosition = useRecoilValue(PostBoxPortalPositionAtom)

  // 랭킹모달 상태관리
  const closeRanking = () => {
    setIsArrived(false)
    setConfirmEnteringRank(false)
    setDefaultCameraPosition([2, 10, 10])
    setDefaultCameraZoom(0.18)
  }

  // 우체국 도착 상태관리
  const [isPostOfficeVisible, setIsPostOfficeVisible] = useRecoilState(
    isPostOfficeVisibleAtom
  )
  const [isFinishPostOfficeVisible, setIsFinishPostOfficeVisible] =
    useRecoilState(isFinishPostOfficeVisibleAtom)
  const [onPostofficeCard, setOnPostOfficeCard] =
    useRecoilState(postofficeCardAtom)
  const [onPostofficeSendLetter, setOnPostofficeSendLetter] = useRecoilState(
    postofficeSendLetterAtom
  )
  const [isFinishPostOfficeCard, setIsFinishPostOfficeCard] = useRecoilState(
    finishPostofficeCardAtom
  )
  const [isFinishPostOfficeSendLetter, setIsFinishPostOfficeSendLetter] =
    useRecoilState(finishPostofficeSendLetterAtom)
  const [guide, setGuide] = useState(false)

  // 가이드 관리
  useEffect(() => {
    if (localStorage.getItem("guideVisible")) {
      setGuide(false)
    } else {
      setGuide(true)
    }
  }, [])

  // 랭킹정보 모달 상태관리
  const [isRankingInformation, setIsRankingInformation] = useState(false)

  // 우체국 종료 확인 함수
  const finishPostOfficeHandler = () => {
    setIsFinishPostOfficeVisible(false)
    setIsPostOfficeVisible(false)
  }

  // 우표선택 종료 확인 함수
  const finishPostOfficeCardHandler = () => {
    setIsFinishPostOfficeCard(false)
    setOnPostOfficeCard(false)
  }

  // 편지작성 종료 확인 함수
  const finishPostOfficeSendLetter = () => {
    setIsFinishPostOfficeSendLetter(false)
    setOnPostofficeSendLetter(false)
  }

  return (
    <>
      <div className={styles.canvasContainer}>
        <SingleHeader />
        <Canvas shadows>
          {/* 사용자가 화면을 확대하거나 회전하지 못하도록 설정 */}
          <OrbitControls enableZoom={false} enableRotate={false} />
          {/* <OrbitControls /> */}

          {/* 전체 밝기 */}
          <ambientLight intensity={1.3} />

          {/* 그림자 조명 */}
          <DirectionalLight />

          {/* 카메라 */}
          <CustomCamera />

          {/* 화면 바탕 */}
          <Map />

          {/* 객체 */}
          <Model />
          {/* <Spot /> */}
          {/* <House /> */}

          {/* 경계 */}
          <PhysicsModel // 상
            position={[0, 0.005, -17]}
            rotation={[0, 0, 0]}
            size={[50, 0.3]}
          />
          <PhysicsModel //하
            position={[0, 0.005, 45]}
            rotation={[0, 0, 0]}
            size={[50, 0.3]}
          />
          <PhysicsModel //좌
            position={[-25.3, 0.005, 14]}
            rotation={[0, Math.PI / 2, 0]}
            size={[62, 0.3]}
          />
          <PhysicsModel //우
            position={[24.6, 0.005, 14]}
            rotation={[0, Math.PI / 2, 0]}
            size={[62, 0.3]}
          />

          {/* 포탈 */}
          {roomPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringRoom}
              portalPosition={roomPortalPosition}
              setPortalVisible={setRoomPortalVisible}
              adjustedAngle={[0, 4, 12]}
              adjustedZoom={0.35}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={roomPortalPosition}
              portalVisible={setRoomPortalVisible}
            />
          )}

          {postOfficePortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringPostOffice}
              portalPosition={postOfficePortalPosition}
              setPortalVisible={setPostOfficePortalVisible}
              adjustedAngle={[-2, 4, 7]}
              adjustedZoom={0.3}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={postOfficePortalPosition}
              portalVisible={setPostOfficePortalVisible}
            />
          )}

          {/* {storePortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringStore}
              portalPosition={storePortalPosition}
              setPortalVisible={setStorePortalVisible}
              adjustedAngle={[2, 4, 4]}
              adjustedZoom={0.3}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={storePortalPosition}
              portalVisible={setStorePortalVisible}
            />
          )} */}

          {otherRoomPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
              portalPosition={otherRoomPortalPosition}
              setPortalVisible={setOtherRoomPortalVisible}
              adjustedAngle={[14, 4, 1]}
              adjustedZoom={0.35}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={otherRoomPortalPosition}
              portalVisible={setOtherRoomPortalVisible}
            />
          )}

          {/* {worldPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringWorld}
              portalPosition={worldPortalPosition}
              setPortalVisible={setWorldPortalVisible}
              adjustedAngle={[0, 3, -8]}
              adjustedZoom={0.3}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={worldPortalPosition}
              portalVisible={setWorldPortalVisible}
            />
          )} */}

          {rankPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringRank}
              portalPosition={rankPortalPosition}
              setPortalVisible={setRankPortalVisible}
              adjustedAngle={[20, 5.5, 5]}
              adjustedZoom={0.37}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={rankPortalPosition}
              portalVisible={setRankPortalVisible}
            />
          )}

          {testPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringTest}
              portalPosition={testPortalPosition}
              setPortalVisible={setTestPortalVisible}
              adjustedAngle={[0, 4, 7]}
              adjustedZoom={0.4}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={testPortalPosition}
              portalVisible={setTestPortalVisible}
            />
          )}

          {instaPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringInsta}
              portalPosition={instaPortalPosition}
              setPortalVisible={setInstaPortalVisible}
              adjustedAngle={[0, 4, 7]}
              adjustedZoom={0.4}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={instaPortalPosition}
              portalVisible={setInstaPortalVisible}
            />
          )}

          {twitterPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringTwitter}
              portalPosition={twitterPortalPosition}
              setPortalVisible={setTwitterPortalVisible}
              adjustedAngle={[0, 4, 7]}
              adjustedZoom={0.4}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={twitterPortalPosition}
              portalVisible={setTwitterPortalVisible}
            />
          )}

          {postBoxPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringPostBox}
              portalPosition={postBoxPortalPosition}
              setPortalVisible={setPostBoxPortalVisible}
              adjustedAngle={[0, 4, 7]}
              adjustedZoom={0.4}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={postBoxPortalPosition}
              portalVisible={setPostBoxPortalVisible}
            />
          )}
        </Canvas>
        {/* 가이드 페이지 */}
        {guide && (
          <GuidePage
            onClick={() => {
              localStorage.setItem("guideVisible", true)
              setGuide(false)
            }}
          />
        )}

        {/* 입장 확인 모달 */}
        {confirmEnteringRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"나의 방에 입장하기"}
                setConfirmEnteringLocation={setConfirmEnteringRoom}
                location={"house"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringPostOffice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"우체국에 입장하기"}
                setConfirmEnteringLocation={setConfirmEnteringPostOffice}
                location={"postOffice"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringStore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"방을 꾸밀 수 있는 가구 상점을 준비 중입니다!"}
                setConfirmEnteringLocation={setConfirmEnteringStore}
                location={"store"}
                flag={"0"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringOtherRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 주민의 방 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
                location={"otherRoom"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {/* 멀티 플레이 포탈 */}
        {/* {confirmEnteringWorld && (
          <div className={styles.confirmModal}>
    
            <ConfirmEnteringDefaultModal
              modalContent={
                "딩동 주민들을 만날 수 있는 멀티 플레이 서비스를 준비중 입니다!"
              }
              setConfirmEnteringLocation={setConfirmEnteringWorld}
              location={"world"}
              flag={"0"}
            />
          </div>
        )}
      
        {/* 우체국 모달 */}
        {isPostOfficeVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsFinishPostOfficeVisible(true)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostOfficeModal />
              </div>
            </motion.div>
          </>
        )}

        {/* 우체국 종료 모달 */}
        {isFinishPostOfficeVisible && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeVisible(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"우체국을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeHandler()}
                cancelClick={() => setIsFinishPostOfficeVisible(false)}
              />
            </div>
          </>
        )}

        {/* 우표선택 모달 */}
        {onPostofficeCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsFinishPostOfficeCard(true)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostofficeCardBox />
              </div>
            </motion.div>
          </>
        )}

        {/* 우표선택 모달 종료 */}
        {isFinishPostOfficeCard && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeCard(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"우표 선택을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeCardHandler()}
                cancelClick={() => setIsFinishPostOfficeCard(false)}
              />
            </div>
          </>
        )}

        {/* 편지보내기 모달 */}
        {onPostofficeSendLetter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsFinishPostOfficeSendLetter(true)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostofficeSendLetter />
              </div>
            </motion.div>
          </>
        )}

        {/* 편지보내기 종료 모달 */}
        {isFinishPostOfficeSendLetter && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeSendLetter(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"편지 작성을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeSendLetter()}
                cancelClick={() => setIsFinishPostOfficeSendLetter(false)}
              />
            </div>
          </>
        )}

        {/* 랭킹모달 */}
        {confirmEnteringRank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={styles.overlay} onClick={() => closeRanking()} />
            <div className={styles.rankingModalContainer}>
              <img
                src={`${urlPath}/assets/icons/information-circle.png`}
                className={styles.Infromation}
                onClick={() => setIsRankingInformation(true)}
              />
              <RankingModal />
            </div>
          </motion.div>
        )}

        {/* 랭킹정보모달 */}
        {isRankingInformation && (
          <>
            <div
              className={styles.InformationOverlay}
              onClick={() => setIsRankingInformation(false)}
            />
            <div className={styles.RankingInformationContainer}>
              <RankingInformation />
            </div>
          </>
        )}

        {confirmEnteringTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"우표 유형 테스트 하러 가기"}
                setConfirmEnteringLocation={setConfirmEnteringTest}
                location={"Test"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringInsta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 인스타그램 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringInsta}
                location={"Insta"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringTwitter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 트위터 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringTwitter}
                location={"Twitter"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringPostBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"편지함 확인하기"}
                setConfirmEnteringLocation={setConfirmEnteringPostBox}
                location={"PostBox"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default SingleMainPage
