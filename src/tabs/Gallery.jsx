import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Loader } from '../components/Loader/Loader';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isEmpty: false,
    showBtn: false,
    error: '',
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          showBtn: page < Math.ceil(total_results / 15),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      photos: [],
      isEmpty: false,
      showBtn: false,
      error: '',
    });
  };

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, isEmpty, showBtn, error, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {showBtn && (
          <Button onClick={this.onLoadMoreBtnClick}>Load more...</Button>
        )}
        {error && (
          <Text textAlign="center">"Sorry something going wrong..."😭</Text>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}
