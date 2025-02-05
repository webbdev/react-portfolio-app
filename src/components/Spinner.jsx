import { FadeLoader } from "react-spinners"

const override = {
	display: 'block',
	margin: '100px auto',
	textAlign: 'center'
}

const Spinner = ({ loading }) => {
  return (
	<FadeLoader 
		color='#aaa'
		loading={loading}
		cssOverride={override}
		size={100}
	/>
  )
}

export default Spinner