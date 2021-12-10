const Pagination = ({ postsPerPage, totalPosts, paginate,previous,next }) => {
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
pageNumbers.push(i);
 }
return (
<nav className="mt-3">
<ul className="pagination" >
<li className="page-item" onClick={(e)=>{previous(e)}}>
<a className="page-link" aria-label="Previous">
<span aria-hidden="true">&laquo;</span>
</a>
</li>
{pageNumbers.map((number) => (
<li key={number} className="page-item" >
<button onClick={(e) => {paginate(e,number)}} className="page-link">
{number}
</button>
</li>
 ))}
<li className="page-item" onClick={(e)=>{next(e)}}>
<a className="page-link" aria-label="Next">
<span aria-hidden="true">&raquo;</span>
</a>
</li>
</ul>
</nav>
 );
};
export default Pagination;