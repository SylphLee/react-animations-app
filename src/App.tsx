import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`  
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;  
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap:10px;
  div:first-child,
  div:last-child {
    grid-column: span 1;
  }
`;

const Box = styled(motion.div)`
  display: flex;  
  height: 200px;  
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;  
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  justify-content: center;
  align-items: center;  
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;  
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: #00A5FF;
`;

const boxLVars = {
  hover: (isLHover: boolean) => ({
    opacity: 0.5,
    x: isLHover ? -20 : 0,
    y: isLHover ? -20 : 0,
  })
}

const boxRVars = {
  hover: (isRHover: boolean) => ({
    opacity: 0.5,
    x: isRHover ? 0 : 0,
    y: isRHover ? 0 : 0,
  })
}

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [id, setId] = useState<null | string>(null);
  const [isLHover, setLIsHover] = useState(false);
  const LIsHoverIn = () => {
    setLIsHover(true);
  };
  const LIsHoverOut = () => {
    setLIsHover(false);
  };
  const [isRHover, setRIsHover] = useState(false);
  const RIsHoverIn = () => {
    setRIsHover(true);
  };
  const RIsHoverOut = () => {
    setRIsHover(false);
  };
  console.log("isLHover : " + isLHover + ", isRHover : " + isRHover);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => n === "2" ?
          <Box onClick={() => setId(n)} key={n} layoutId={n}>
            {!clicked ? <Circle layoutId="circle" /> : null}
          </Box> : n === "3" ?
            <Box onClick={() => setId(n)} key={n} layoutId={n}>
              {clicked ? <Circle layoutId="circle" /> : null}
            </Box> : n === "1" ?
              <Box variants={boxLVars} style={{width: isLHover ? "106%" : "100%", height: isLHover ? "110%" : "100%"}} custom={isLHover} onMouseOver={LIsHoverIn} onMouseOut={LIsHoverOut} whileHover="hover" onClick={() => setId(n)} key={n} layoutId={n} /> :
              <Box variants={boxRVars} style={{width: isRHover ? "106%" : "100%", height: isRHover ? "110%" : "100%"}}  custom={isRHover} onMouseOver={RIsHoverIn} onMouseOut={RIsHoverOut} whileHover="hover" onClick={() => setId(n)} key={n} layoutId={n} />

        )}
      </Grid>
      <AnimatePresence>
        {id ?
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
          : null}
      </AnimatePresence>
      <button style={{ marginTop: 20, color: !clicked ? "blue" : "red" }} onClick={toggleClicked}>Switch</button>
    </Wrapper>
  );
}
export default App;