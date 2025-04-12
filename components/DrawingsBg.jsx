import cora from '../src/assets/cora.png'
import gatito from '../src/assets/gatito.png'
import gatito1 from '../src/assets/gatito1.png'
import gatito2 from '../src/assets/gatito2.png'
import gatito3 from '../src/assets/gatito3.png'
import gatito4 from '../src/assets/gatito4.png'
import gatito5 from '../src/assets/gatito5.png'
import gatito6 from '../src/assets/gatito6.png'
import gatito7 from '../src/assets/gatito7.png'
import gatito8 from '../src/assets/gatito8.png'
import tree from '../src/assets/tree.png'
import stickman from '../src/assets/stickman.png'
import gym from '../src/assets/gym.png'
import firma from '../src/assets/firma.png'
import dayMarks from '../src/assets/daymarks.png'
import consejo1 from '../src/assets/consejo1.png'
import consejo2 from '../src/assets/consejo2.png'
import { useUIContext } from '../context/UIContext'

export function DrawingsBg() {
  const { firstTask, drawingsExists } = useUIContext()

  return (
    <>
      {!drawingsExists && (
        <img
          className="absolute w-[10rem] top-20 left-28.5 md:top-40 md:left-4"
          src={dayMarks}
          alt=""
        />
      )}

      {firstTask && (
        <>
          <img
            className="md:hidden absolute w-[9.5rem] top-6/12 left-7"
            src={consejo1}
            alt=""
          />
          <img
            className="md:hidden absolute w-[10rem] top-6/12 right-3"
            src={consejo2}
            alt=""
          />
        </>
      )}

      <img
        className="hidden md:block absolute w-[5rem] left-35 scale-x-200 -bottom-60"
        src={gatito1}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[5rem] scale-x-200 left-14 -bottom-310"
        src={gatito2}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[5rem] right-20 scale-x-200 bottom-10"
        src={gatito3}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[4rem] right-10 scale-x-200 -bottom-97"
        src={gatito4}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[4rem] left-56 scale-x-200 bottom-14"
        src={gatito5}
        alt=""
      />
      <img
        className="hidden md:block  absolute w-[5rem] left-19 scale-x-200 -bottom-118"
        src={gatito6}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[5rem] right-28 scale-x-200 -bottom-180"
        src={gatito7}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[5rem] left-12 scale-x-200 -bottom-220"
        src={gatito8}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[4rem] right-26 scale-x-200 -bottom-360"
        src={firma}
        alt=""
      />

      <img
        className="hidden md:block absolute w-[4rem] top-5 left-14 scale-x-200"
        src={gatito}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[2rem] top-5 right-4 scale-x-200"
        src={cora}
        alt=""
      />
      <img
        className="absolute hidden md:block size-20 bottom-45 right-4"
        src={tree}
        alt=""
      />
      <img
        className="absolute hidden md:block size-10 -bottom-200 left-52"
        src={stickman}
        alt=""
      />
      <img
        className="absolute hidden md:block size-8 top-73 left-54 scale-x-200"
        src={gym}
        alt=""
      />
    </>
  )
}
