import frase from '../src/assets/frase.png'
import options from '../src/assets/options.png'
import addtask from '../src/assets/addtask.png'
import frase1 from '../src/assets/frase1.png'
import draw from '../src/assets/draw.png'
import drawCategory from '../src/assets/drawCategory.png'

export function Drawings() {
  return (
    <>
      <img
        className="hidden md:block absolute w-[22rem] top-15 left-17"
        src={draw}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[22rem] top-8 right-27 "
        src={drawCategory}
        alt=""
      />
      <img
        className="hidden md:block absolute w-[52rem] top-[58%] left-[50%] translate-[-50%] "
        src={frase}
        alt=""
      />
      <img
        className="block md:hidden absolute scale-90 top-[48%] left-[50%] translate-[-50%] "
        src={frase1}
        alt=""
      />
      <img
        className="block md:hidden absolute scale-60 top-[68%] left-[65%] translate-[-50%] "
        src={addtask}
        alt=""
      />
      <img
        className="block md:hidden absolute scale-60 top-[20%] left-[40%] translate-[-50%] "
        src={options}
        alt=""
      />
    </>
  )
}
