import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ROLES } from '../utils/role-decorator';
import { BookQueryParams } from './book-query-params';
import { BookResponse } from './book-response.model';
import { BookDto } from './book.model';
import { Book } from './book.schema';
import { BookService } from './book.service';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAll(@Query() query: BookQueryParams): Promise<BookResponse> {
    const bookResult = await this.bookService.getAll(query);
    return bookResult;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Book> {
    const book = await this.bookService.findById(id);
    if (!book) throw new NotFoundException();
    return book;
  }

  @ROLES('editor,developer')
  @Post()
  async createBook(@Body() book: BookDto) {
    const createdBook = await this.bookService.createdBook(book);
    return createdBook;
  }

  @ROLES('developer,editor')
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: BookDto,
  ): Promise<Book> {
    const existingBook = await this.bookService.findById(id);
    if (!existingBook) throw new NotFoundException();
    return await this.bookService.updateBook(book);
  }

  @ROLES('developer,editor')
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    const existingBook = await this.bookService.findById(id);
    if (!existingBook) throw new NotFoundException();
    return await this.bookService.deleteBook(id);
  }
}
