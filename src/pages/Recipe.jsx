import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const key = 'da72c666ce5a43cda80926e726354611'
const url = 'https://api.spoonacular.com/recipes/'

const Recipe = () => {
	const [recipe, setRecipe] = useState({});
	const [activeTab, setActiveTab] = useState('instructions');
	const id = useParams()

	// console.log(id.id);
	const fetchDetalis = async () => {
		try {
			const data = await fetch(`${url}${id.id}/information?apiKey=${key}`)
			const result = await data.json();
			setRecipe(result)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchDetalis();
	}, [id.id])

	return (
		<DetailWrapper>
			<div>
				<h2>{recipe.title}</h2>
				<img src={recipe.image} alt={recipe.title} />
			</div>
			<Info>
				<Button
					className={activeTab === 'instructions' ? 'active' : null}
					onClick={() => setActiveTab('instructions')}>Instructions</Button>
				<Button
					className={activeTab === 'ingredients' ? 'active' : null}
					onClick={() => setActiveTab('ingredients')}>Ingredients</Button>

				{activeTab === 'instructions' && (
					<div>
						<h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
						<h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
					</div>

				)}

				{activeTab === 'ingredients' && (

					<ul>
						{recipe.extendedIngredients.map((ingredient) => {
							return (
								<li key={ingredient.id}>{ingredient.original}</li>
							)
						})}
					</ul>
				)}
			</Info>
		</DetailWrapper>
	)
}


const DetailWrapper = styled.div`
	margin-top: 10rem;
	margin-bottom: 5rem;
	width: 60rem;
	display: felx;
	.active{
		background: linear-gradient(35deg, #494949, #313131);
		color: white;
	}
	h2{
		margin-bottom: 2rem;
	}
	li{
		font-size: 1.2rem;
		line-height: 2.5rem;
	}
	ul{
		margin-top: 2rem;
	}
`
const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background: white;
	borde: 2px solid black;
	margin-right: 2rem;
	font-weight: 600;
`

const Info = styled.div`
	margin-left:10rem;
`

export default Recipe