import './Cotegories.css';
const Categories = () => {

    const categories = [
        {
            name:'Kolco',
            image:"img/categories/Kolco.png"
        },
        {
            name:'Kole',
            image:'img/categories/Kole.png'
        },
        {
            name:'Sergi',
            image:'img/categories/Sergi.png'
        },
        {
            name:'Cep',
            image:'img/categories/Cep.png'
        },
        {
            name:'Brosh',
            image:'img/categories/Brosh.png'
        },
        {
            name:'Kuloni',
            image:'img/categories/Kulon.png'
        },
        {
            name:'Brasleti',
            image:'img/categories/Brasleti.png'
        }
       
    ];

    return (
    <div className="categories">
        <div>
            <div className="icons active">
                <img src="img/icons/Vector-women.png" />
            </div>
            <div className="icons">
                <img src="img/icons/Vector-man.png" />
            </div>
        </div>
        <div className='categories-list-container'>
            {categories.map((item, index)=>{
                return (
                <div key={index} className='categories-item'>
                    <div>
                        <img src={item.image} />
                    </div>
                    <div>
                    {item.name}
                    </div>
                </div>
            );
            })}
        </div>

        <div className='add-cotegory'>
        <img src="img/icons/plus.png"/>
        </div>

    </div>
    )
}

export default Categories;