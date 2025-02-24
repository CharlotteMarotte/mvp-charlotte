import React from 'react';
import './AboutView.css';

function AboutView(props) {
  //
  // For About text about website
  //

  const books = [
    {
      title: 'Caliban and the witch',
      src: 'https://m.media-amazon.com/images/I/41bF7lJgilL.jpg',
      link: 'https://www.akpress.org/calibanandthewitch.html',
      info: 'Inspiration for this website, thorough analysis by the historian Silvia Federici about the conncetion of the beginning of capitalism, the witch hunts and the coloniazation of the Americas.',
    },
    {
      title: 'Invisible Labor',
      link: 'https://www.ucpress.edu/book/9780520287174/invisible-labor',
      src: 'https://m.media-amazon.com/images/I/51QsYeo5BUL.jpg',
      info: '',
    },
    {
      title: 'Behind the screen',
      link: 'https://yalebooks.yale.edu/book/9780300261479/behind-the-screen/',
      src: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545502475l/41962923._SY475_.jpg',
      info: '',
    },
    {
      link: 'https://ghostwork.info/',
      title: 'Ghost work',
      src: 'https://images-na.ssl-images-amazon.com/images/I/71CQtQt3rqL.jpg',
      info: '',
    },
    {
      title: 'Heteromation, and Other Stories of Computing and Capitalism',
      link: 'https://mitpress.mit.edu/books/heteromation-and-other-stories-computing-and-capitalism',
      src: 'https://images-na.ssl-images-amazon.com/images/I/51wxQFVaUTL._SX336_BO1,204,203,200_.jpg',
      info: '',
    },
    {
      title: 'The second shift',
      link: 'https://www.penguinrandomhouse.ca/books/310593/the-second-shift-by-arlie-hochschild/9781101575512',
      src: 'https://images-na.ssl-images-amazon.com/images/I/417Hrk6NXrL.jpg',
      info: '',
    },
  ];

  if (!books) {
    return (
      <figure className="figure">
        <img
          src="/images/ErrorPage.jpg"
          className="figure-img img-fluid mb-0"
          alt="An error occurred"
        />
        <figcaption className="figure-caption text-center">
          <a className="link-secondary" href="https://www.vecteezy.com/vector-art/1384282-404-error-concept-for-landing-page-design">
            404 error concept for landing page design Vectors by Vecteezy
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="AboutView col-6 offset-3 mb-5">
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
      <h2>About</h2>

      <blockquote className="blockquote">
        <p>
          “[A] woman, working fulltime in the home or outside of it as well,
          married or single, has to put hours of labor into reproducing her own
          labor power, and women well know the tyranny of this task, for a
          pretty dress and hairdo are conditions for their getting the job,
          whether on the marriage market or on the wage labor market.”
        </p>
      </blockquote>
      <figcaption className="blockquote-footer">
        Silvia Federici{' '}
        <cite title="Source Title">
          Revolution at Point Zero: Housework, Reproduction, and Feminist
          Struggle
        </cite>
      </figcaption>

      <h3 className="mt-5">About this project</h3>

      <p>
        This is a student project that was created at CodeOp, a{' '}
        <a
          className="link-secondary"
          href="https://codeop.tech/full-stack-development-bootcamp/"
        >
          full stack development bootcamp
        </a>{' '}
        in Barcelona. Building on my research for my{' '}
        <a
          className="link-secondary"
          href="https://books.google.de/books/about/K%C3%BCnstliche_k%C3%BCnstliche_Intelligenz.html?id=bvaGzgEACAAJ&redir_esc=y"
        >
          Bachelor Thesis about Invisible Labor in Artificial Intelligence
        </a>{' '}
        and my studies with Dr. Kimberly George in the{' '}
        <a
          className="link-secondary"
          href="https://www.feminismschool.com/courses/caliban-and-the-witch-in-a-time-of-covid-19-v2"
        >
          Caliban and the Witch in a Time of COVID-19
        </a>
        . Feel free to browse along, create an invoice, evaluate the statistics
        of other invoices created.
      </p>

      <h3 className="mt-5">Book Recommendations</h3>
      <div class="container text-center">
        <div class="row">
          {books.map((e) => (
            <div class="col-12 col-sm-6 col-lg-4">
              <a href={e.link} target="_blank">
                <img src={e.src} alt={e.title} className="img-fluid image" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutView;
