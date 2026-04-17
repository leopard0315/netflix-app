import React, { useState,useEffect } from 'react'
import { useSearchMovieQuery}  from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import { Container,Row,Col,Alert,Dropdown,DropdownButton} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import "./MoviePage.style.css";
import ReactPaginateModule from 'react-paginate';
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

const MoviePage = () => {
  const [query,setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const [pageRange, setPageRange] = useState(window.innerWidth <= 768 ? 3 : 5);

  const [sortOrder, setSortOrder] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const {data: genreData} = useMovieGenreQuery();

  const getGenreTitle = () => {
    if (!selectedGenre) return "Genre"; 
  
    const genre = genreData?.find(g => g.id === selectedGenre);
    return genre ? genre.name : "Genre";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageRange(3);
      } else {
        setPageRange(5); 
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const keyword = query.get("q");
  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  
const getFilteredList = () => {
    if (!data?.results) return [];

    let list = [...data.results];

    if (selectedGenre) {
      list = list.filter((movie) => movie.genre_ids.includes(selectedGenre));
    }

    if (sortOrder === "desc") {
      list.sort((a, b) => b.popularity - a.popularity); 
    } else if (sortOrder === "asc") {
      list.sort((a, b) => a.popularity - b.popularity); 
    }
    return list;
  };

  const filteredList = getFilteredList();

  const handlePageClick = (selected) => {
    setPage(selected.selected + 1);
    window.scrollTo(0, 0);
  };

  if(isLoading){
        return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="danger" />
    </div>
  );
    };
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    };
    console.log("MovieCard:", MovieCard);
    console.log("ReactPaginate:", ReactPaginate);

    

  return (
    <Container>
      <Row>
        <Col lg={3} xs={12} className="filter-area mb-4">
          <h4 className="text-white mb-3">Filter</h4>
          <DropdownButton 
            title={sortOrder === "desc" ? "Popularity (High)" : sortOrder === "asc" ? "Popularity (Low)" : "Popularity"} 
            variant="outline-danger" 
            className="mb-3 w-100"
            onSelect={(e) => setSortOrder(e)}
          >
            <Dropdown.Item eventKey="desc">High</Dropdown.Item>
            <Dropdown.Item eventKey="asc">Low</Dropdown.Item>
          </DropdownButton>

          <DropdownButton 
            title={getGenreTitle()} 
            variant="outline-light" 
            className="w-100"
            onSelect={(e) => setSelectedGenre(e ? Number(e) : null)}
          >
          <Dropdown.Item eventKey="">All Genres</Dropdown.Item>
          {genreData?.map((genre) => (
              <Dropdown.Item key={genre.id} eventKey={genre.id}>
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>


        <Col lg={8} xs = {12}>
        <Row>
          {filteredList.map((movie) =>(
            <Col key = {movie.id} lg={4} xs = {12}>
              <MovieCard movie = {movie}/>
            </Col>
          ))}
        </Row>
        <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        marginPagesDisplayed={window.innerWidth <= 768 ? 1 : 2}
        pageCount={data?.total_pages > 500 ? 500 : data?.total_pages || 0}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center mt-5"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
          
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage;