import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, CssBaseline, IconButton, Typography, Button, Drawer, Paper, Divider, Container, Card, CardActionArea, CardContent, CardMedia, Grid, InputBase } from '@material-ui/core'
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import Logo from './icon.jpg'
import axios from 'axios'
import { useStyles } from '../Style/Style'

const Layout = () => {
	const classes = useStyles()
	const history = useHistory()
	const [open, setOpen] = useState(false)
	const [pokemonList, setPokemonList] = useState([])
	const [searchPokemon, setSearchPokemon] = useState('')
	const [pokemon, setPokemon] = useState({})
	const [isSearch, setIsSearch] = useState(false)

	const loadData = () => {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
			.then(resp => {
				for (let i = 0; i < resp.data.results.length; i++) {
					axios.get(resp.data.results[i].url)
						.then(result => {
							setPokemonList(prevArray => [...prevArray, result.data])
						})
				}
			})
	}

	const onSearch = async () => {
		if (searchPokemon === '') {
			setIsSearch(false)
			setPokemonList([])
			loadData()
		} else {
			await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
				.then(resp => {
					setIsSearch(true)
					setPokemon(resp.data)
				})
		}
	}


	useEffect(loadData, [])

	return (
		<>
			<CssBaseline />
			<AppBar color='secondary'>
				<Toolbar>
					<IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
						<MenuIcon />
					</IconButton>
					<Typography style={{ flexGrow: 1 }}>Samus App</Typography>
					<Button variant='text' color='inherit' onClick={() => history.push('/')}>Log out</Button>
				</Toolbar>
			</AppBar>
			<Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
				<Paper className={classes.paper} elevation={0}>
					<div className={classes.div}>
						<IconButton edge='start' color='inherit' onClick={() => setOpen(false)}>
							<MenuIcon />
						</IconButton>
						<img src={Logo} alt='...' className={classes.logo} />
					</div>
					<Divider />
				</Paper>
			</Drawer>
			<Container maxWidth='lg' className={classes.container}>
				<Grid container spacing={2} alignItems='center'>
					<Grid item xs={12} sm={12}>
						<Paper elevation={2} className={classes.paperSearch}>
							<InputBase
								className={classes.input}
								value={searchPokemon}
								placeholder='Buscar pokemón'
								onChange={e => setSearchPokemon(e.target.value)}
								onKeyDown={e => { if (e.keyCode === 13) { onSearch() } }}
							/>
							<IconButton className={classes.iconButton} onClick={onSearch}>
								<SearchIcon />
							</IconButton>
						</Paper>
					</Grid>
					{isSearch ?
						<Grid item xs={12} sm={4}>
							<Card className={classes.card} raised={true}>
								<CardActionArea>
									<CardContent>
										<CardMedia
											image={pokemon.sprites.front_default}
											className={classes.imagePoke}
										/>
										<Typography align='center' variant='h4'>{pokemon.name}</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
						:
						pokemonList.map((poke, index) => (
							<Grid key={index} item xs={12} sm={4}>
								<Card className={classes.card} raised={true}>
									<CardActionArea>
										<CardContent>
											<CardMedia
												image={poke.sprites.front_default}
												className={classes.imagePoke}
											/>
											<Typography align='center' variant='h4'>{poke.name}</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))
					}
				</Grid>
			</Container>
			<footer className={classes.footer}>
				<Container maxWidth='sm'>
					<Typography align='center'>Samus © {new Date().getFullYear()}</Typography>
				</Container>
			</footer>
		</>
	)
}

export default Layout