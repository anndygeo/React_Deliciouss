import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const key = 'da72c666ce5a43cda80926e726354611'
const url = 'https://api.spoonacular.com/recipes/random'


const Popular = () => {
	const [loading, setLoading] = useState(true)
	const [popular, setPopular] = useState([])


	const getPopular = async () => {
		setLoading(true)

		const localData = localStorage.getItem('popular');

		if (localData) {
			setPopular(JSON.parse(localData))
		}
		else {
			try {
				const response = await fetch(`${url}?apiKey=${key}&number=9`)
				const api = await response.json()
				setPopular(api.recipes)
				localStorage.setItem('popular', JSON.stringify(api.recipes))
				setLoading(false)

			} catch (error) {
				console.log(error);
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		getPopular()
	}, [])



	return (
		<div>
			<Wrapper>
				<h3>Popular Picks</h3>
				<Splide options={{
					perPage: 4,
					arrows: false,
					pagination: false,
					drag: 'free',
					gap: '2rem',

				}}>
					{popular.map((recipe) => {
						return (
							<SplideSlide key={recipe.id}>
								<Link to={`/recipe/${recipe.id}`}>
									<Card>
										<p>{recipe.title}</p>
										<img src={recipe.image} alt={recipe.title} />
										<Gradient />
									</Card>
								</Link>
							</SplideSlide>
						);
					})}
				</Splide>
			</Wrapper>
		</div>
	)
}

const Wrapper = styled.div`
	margin: 4rem 0rem;
`;

const Card = styled.div`
	min-height: 25rem;
	border-radius: 2rem;
	overflow: hidden; 
	position: relative;

	img{
		border-radius: 2rem;
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;	
	}

	p{
		position:absolute;
		z-index: 10;
		left: 50%;
		bottom: 1%;
		transform: translate(-50%, 0%);
		color: white;
		width 100%;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center; 
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: liniar-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));

`


export default Popular