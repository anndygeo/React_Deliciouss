import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const key = 'da72c666ce5a43cda80926e726354611'
const url = 'https://api.spoonacular.com/recipes/complexSearch'

const Cuisine = () => {
	const [cuisine, setCuisine] = useState([]);
	const param = useParams();


	const getCuisine = async (name) => {
		const check = localStorage.getItem('cuisine')

		if (check) {
			setCuisine(JSON.parse(check))
		} else {
			try {
				const response = await fetch(`${url}?apiKey=${key}&cuisine=${name}`)
				const recipes = await response.json();
				setCuisine(recipes.results)
				localStorage.setItem('cuisine', JSON.stringify(recipes.results))
			} catch (error) {
				console.log('error', error);
			}
		}

	}

	// console.log(cuisine); 

	useEffect(() => {
		getCuisine(param.type);
	}, [param.type])

	return (
		<Grid
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{cuisine.map((item, index) => {
				return (
					<Link key={item.id} to={`/recipe/${item.id}`}>
						<Card>
							<img src={item.image} alt={item.title} />
							<h4>{item.title}</h4>
						</Card>
					</Link>
				)
			})}
		</Grid>
	)
}

const Grid = styled(motion.div)`
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


export default Cuisine