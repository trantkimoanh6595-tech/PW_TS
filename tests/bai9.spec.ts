import { test, expect, Locator } from '@playwright/test';
import type {Page} from '@playwright/test';

interface MovieCardData { // Khai báo lại interface để block này đứng độc lập vẫn hiểu được kiểu dữ liệu trả về.
  title: string; // Tên phim hiển thị trên card.
  year: number; // Năm phát hành đã parse sang number.
  rating: number; // Điểm rating đã parse sang number.
  genres: string[]; // Danh sách tag thể loại của card.
  liked: boolean; // Card này đang ở trạng thái yêu thích hay không.
  inList: boolean; // Card này đã được thêm vào list hay chưa.
}

interface MovieSummaryData { // Shape của khối thống kê nằm bên phải dashboard.
  totalMovies: number; // Tổng số card phim đang render.
  favoriteCount: number; // Số phim đang được đánh dấu yêu thích.
  inListCount: number; // Số phim đang nằm trong list.
  averageRating: number; // Điểm trung bình của toàn bộ danh sách.
  newMovieCount: number; // Số phim có năm phát hành từ 2024 trở lên.
}

interface MovieDashboardData { // Object tổng hợp để assert cả list card lẫn summary.
  movies: MovieCardData[]; // Mảng movie card đã chuẩn hóa.
  summary: MovieSummaryData; // Khối thống kê đã chuẩn hóa.
}

async function readMovieCard(card: Locator): Promise<MovieCardData> { // Tái dùng helper đọc 1 card để phần đọc cả list không lặp code.
  const title = (await card.getAttribute('data-title')) ?? ''; // Đọc title từ data-* ổn định của card.
  const year = Number((await card.getAttribute('data-year')) ?? '0'); // Parse năm phát hành từ string sang number.
  const rating = Number((await card.getAttribute('data-rating')) ?? '0'); // Parse rating từ string sang number.
  const genres = ((await card.getAttribute('data-genres')) ?? '').split(',').filter(Boolean); // Tách chuỗi genre thành mảng string.
  const liked = ((await card.getAttribute('data-liked')) ?? 'false') === 'true'; // Đổi data-liked sang boolean thật.
  const inList = ((await card.getAttribute('data-inlist')) ?? 'false') === 'true'; // Đổi data-inlist sang boolean thật.
  return { title, year, rating, genres, liked, inList }; // Trả về object movie card đã chuẩn hóa kiểu dữ liệu.
}

async function readMovieCards(cards: Locator): Promise<MovieCardData[]> { // Dùng cùng một helper cho mọi card có layout giống nhau.
  const total = await cards.count(); // Đếm xem hiện có bao nhiêu card phim.
  const items: MovieCardData[] = []; // Tạo mảng kết quả để chứa toàn bộ card đã đọc.
  for (let index = 0; index < total; index += 1) { // Duyệt card theo chỉ số 0-based.
    const card = cards.nth(index); // Lấy đúng card ở vị trí hiện tại.
    items.push(await readMovieCard(card)); // Tái dùng helper đọc một card rồi push vào mảng.
  }
  return items; // Trả về toàn bộ danh sách movie card dưới dạng object typed.
}

async function readMovieSummary(movieDashboard: Locator): Promise<MovieSummaryData> { // Helper riêng cho khối thống kê để code dễ đọc hơn.
  const totalMoviesText = ((await movieDashboard.locator('#movie-count').textContent()) ?? '0 movies').trim(); // Đọc text tổng số phim.
  const favoriteCountText = ((await movieDashboard.locator('#favorite-count').textContent()) ?? '0').trim(); // Đọc text số phim yêu thích.
  const inListCountText = ((await movieDashboard.locator('#inlist-count').textContent()) ?? '0').trim(); // Đọc text số phim trong list.
  const averageRatingText = ((await movieDashboard.locator('#avg-rating').textContent()) ?? '0').trim(); // Đọc text điểm trung bình.
  const newMovieCountText = ((await movieDashboard.locator('#new-movie-count').textContent()) ?? '0').trim(); // Đọc text số phim mới.

  return {
    totalMovies: Number(totalMoviesText.replace(' movies', '')), // Parse '4 movies' thành number 4.
    favoriteCount: Number(favoriteCountText), // Parse số yêu thích thành number.
    inListCount: Number(inListCountText), // Parse số phim trong list thành number.
    averageRating: Number(averageRatingText), // Parse rating trung bình thành number.
    newMovieCount: Number(newMovieCountText), // Parse số phim mới thành number.
  }; // Trả về object summary typed để assert theo field.
}
async function gotoPage(page:Page) {
  const urlpage = 'https://lab.autoneko.com/'
        await page.goto(urlpage)
        await page.getByRole('link', { name: 'Bài 3: Text Methods & Assertions', exact: true }).click()
        await page.getByRole('tab', { name: '✅ Expect Assertion' }).click()
  
}

async function readMovieDashboard(panel: Locator): Promise<MovieDashboardData> { // Một điểm vào chung cho cả dashboard có nhiều card giống nhau.
  const movieDashboard = panel.getByTestId('lesson3-movie-dashboard'); // Scope toàn bộ phần movie dashboard để tránh đọc nhầm chỗ khác.
  const movieCards = movieDashboard.getByTestId('movie-card'); // UI nhiều card giống nhau => gom thành một locator list để xử lý hàng loạt.
  await expect(movieCards).toHaveCount(4); // Chờ đủ 4 movie card trước khi bắt đầu trích xuất dữ liệu.
  await expect(movieDashboard.locator('#movie-count')).toHaveText('4 movies'); // Chờ text tổng số phim ổn định.
  await expect(movieDashboard.locator('#favorite-count')).toHaveText('1'); // Chờ thống kê yêu thích render xong.
  await expect(movieDashboard.locator('#inlist-count')).toHaveText('1'); // Chờ thống kê trong list render xong.
  await expect(movieDashboard.locator('#avg-rating')).toHaveText('8.47'); // Chờ rating trung bình hiển thị đúng trước khi parse.
  await expect(movieDashboard.locator('#new-movie-count')).toHaveText('2'); // Chờ số phim mới ổn định trước khi parse.
console.log("read movie dashboard")
  const movies = await readMovieCards(movieCards); // Đọc toàn bộ list card thành mảng MovieCardData.
  const summary = await readMovieSummary(movieDashboard); // Đọc riêng khối summary thành MovieSumma
  
  console.log('movie:', movies, 'summary', summary)

   return { movies, summary }; // Gộp tất cả về một object để đoạn assert phía dưới dùng lại.
}
// declare function readMovieDashboard(panel: Locator): Promise<MovieDashboardData>; // Giả sử helper ở bước 2 đã nằm phía trên trong cùng file test.

test('movie dashboard dùng generic expect sau khi đã trích xuất dữ liệu', async ({ page }) => { 
  await gotoPage(page)// Đây là ví dụ phần assert hoàn chỉnh sau khi đã có helper đọc dashboard.
  const panel = page.getByRole('tabpanel', { name: '✅ Expect Assertions' }); // Giới hạn mọi thao tác trong đúng tab expect.
  const { movies, summary } = await readMovieDashboard(panel); // Lấy toàn bộ dữ liệu dashboard đã được chuẩn hóa kiểu.
  const movieTitles = movies.map(movie => movie.title); // Rút riêng mảng title để assert thứ tự card đang render.
  const likedTitles = movies.filter(movie => movie.liked).map(movie => movie.title); // Rút riêng danh sách phim đang được yêu thích.
  const moviesByTitle = Object.fromEntries(movies.map(movie => [movie.title, movie])) as Record<string, MovieCardData>; // Đổi mảng sang object map để tra cứu theo title dễ hơn.

  expect(summary.totalMovies).toBe(4); // .toBe: tổng số card phim phải đúng 4.
  expect(summary.favoriteCount).toBe(1); // .toBe: ban đầu chỉ có 1 phim được thích.
  expect(summary.inListCount).toBe(1); // .toBe: ban đầu chỉ có 1 phim trong list.
  expect(summary.averageRating).toBeGreaterThan(8); // .toBeGreaterThan: điểm trung bình của thư viện phải lớn hơn 8.
  expect(summary).toEqual({ totalMovies: 4, favoriteCount: 1, inListCount: 1, averageRating: 8.47, newMovieCount: 2 }); // .toEqual: so cả object summary trong một lần.
  expect(movieTitles).toEqual(['The Silent Code', 'Edge of Pixels', 'Whispers of Light', 'Quantum Run']); // .toEqual: so toàn bộ thứ tự title đang render trên UI.
  expect(likedTitles).toEqual(['Edge of Pixels']); // .toEqual: kiểm tra danh sách yêu thích sau khi lọc từ mảng card.
  expect(movies[0]).toEqual({ title: 'The Silent Code', year: 2024, rating: 8.7, genres: ['Sci-Fi', 'Drama'], liked: false, inList: false }); // .toEqual: so toàn bộ object card đầu tiên.
  expect(movies).toContainEqual({ title: 'Whispers of Light', year: 2022, rating: 8.2, genres: ['Romance', 'Drama'], liked: false, inList: true }); // .toContainEqual: tìm một object card đầy đủ trong cả mảng.
  expect(movies).toEqual(expect.arrayContaining([expect.objectContaining({ title: 'Whispers of Light', genres: expect.arrayContaining(['Romance', 'Drama']) })])); // arrayContaining + objectContaining: chỉ cần mảng chứa một card có đúng các field quan trọng.
  expect(moviesByTitle['Quantum Run']).toEqual(expect.objectContaining({ rating: 9.1, inList: false })); // objectContaining trên object map giúp tra cứu theo title rất gọn.
  console.log("end test case")
});