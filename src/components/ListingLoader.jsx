import Snake from "../../public/Snake.gif"

const ListingLoader = ({outerDivClass,insidedivClass}) => {
  return (
    <div className={outerDivClass}>
        <img className={insidedivClass} src={Snake} alt="" />
    </div>
  )
}

export default ListingLoader
