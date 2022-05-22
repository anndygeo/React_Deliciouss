import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const key = 'da72c666ce5a43cda80926e726354611'
const url = 'https://api.spoonacular.com/recipes/complexSearch'

const Searched = () => {
	const [searchedRecipes, setSearchedRecipes] = useState([]);
	let params = useParams();


	const getSearched = async (name) => {

		try {
			const response = await fetch(`${url}?apiKey=${key}&query=${name}`)
			const recipes = await response.json();
			setSearchedRecipes(recipes.results)
		} catch (error) {
			console.log('error', error);
		}
	}


	useEffect(() => {
		getSearched(params.search);
	}, [params.search])

	// if(!searchedRecipes){
	// 	return(
	// 		<div>
	// 			<h1>Nothing</h1>
	// 		</div>
	// 	)
	// }

	return (
		<Grid>
			{searchedRecipes?.map((item) => {
				return (
					<Link to={`/recipe/${item.id}`}>
						<Card key={item.id}>
							<img src={item.image} alt={item.title} />
							<h4>{item.title}</h4>
						</Card>
					</Link>
				)
			})}
		</Grid>
	)
}


const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-gap: 3rem;
`;

const Card = styled.div`
	img{
		width: 100%;
		border-radius: 2rem;
	}

	a	{
		text-decoration: none;
	}

	h4{
		text-align: center;
		padding: 1rem;

	}

`

export default Searched