import style from "../Home/home.module.css";
import Footer from "../Footer/Footer";

const Home = ({ content }) => {
  return (
    <div>
      <div className={style.containerBan}>
      <h1 className={style.h1}>Marketing Website</h1> 
      <p className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit quos incidunt iure, nisi voluptate quo velit.</p>
      <div className={style.continerButton}>
          <button className={style.button}>Contact us</button>
        </div>
      </div>
      
      <ul className={style.ul}>
        {content.map((item, index) => (
          <li className={style.li} key={index}>
            <h2 className={style.h2}>{item.title}</h2>
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                objectFit: "cover",
                display: "block",
                marginBottom: "10px",
              }}
            />
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    
      <Footer/>
    </div>
  );
};

export default Home;
