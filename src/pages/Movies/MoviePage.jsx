import React, { useState } from 'react'
import { useSearchMovieQuery}  from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import { Container,Row,Col,Alert} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginateModule from 'react-paginate';
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

// 경로 2가지
// 1) nav바에서 클릭해서 온경우 -> popular movie 보여주기
// 2) keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

// pagination
// 1) 설치
// 2) page state 만들기
// 3) pagination 클릭할때마다 page 바꿔주기
// 4) page값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {

  const [query,setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const keyword = query.get("q");

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  const handlePageClick = (selected) => {
    setPage(selected.selected + 1);
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
        <Col lg={4} xs = {12}>필터</Col>
        <Col lg={8} xs = {12}>
        <Row>
          {data?.results?.map((movie) =>(
            <Col key = {movie.id} lg={4} xs = {12}>
              <MovieCard movie = {movie}/>
            </Col>
          ))}
        </Row>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages || 0}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page-1}
      />
          
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage;