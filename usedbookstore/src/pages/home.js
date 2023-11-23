import React from 'react';
import { Link } from 'react-router-dom';
import education from "../assets/education.jpeg";
import money from "../assets/money.png";
import lifestyle from "../assets/lifestyle.jpg";
import food from "../assets/Food.jpg";
import howto from "../assets/howto.jpg";
import humorous from "../assets/humorous.jpeg";
import motivation from "../assets/motivational.jpeg";
import profession from "../assets/professional.jpeg";
import health from "../assets/health.jpg";

const Home = () => {
  return (
    <div style={{ paddingTop: 100 }}>
      <h1 style={{ textAlign: 'center' }} >EXPLORE BOOKS BY CATEGORY</h1><br></br>

      <div className="container" style={{ paddingTop: 40 }}>
        <h1></h1>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr>
              <td> </td>
            </tr>
            <tr>
              <td>
                <div className="category-grid">
                  {/* Category 1: How-To/Directional */}
                  <div className="category" id="food">
                    <img src={howto} alt="How-To/Directional Category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>How-To/Directional</h3>
                    <div className="description">
                      <p>Examples:</p>
                      <ul>
                        <li>How to Organize study programming</li>
                        <li>How to Make Perfect Pancakes Every Time</li>
                        <li>How to Start Your Own Blog</li>
                        <li>How to Build a Raised Garden Bed for Beginners</li>
                        <li>How to  manage stress</li>
                      </ul>
                    </div>
                  </div>

                  {/* Category 5: Personal Memories */}
                  <div className="category" id="lifestyle" >
                    <img src={lifestyle} alt="Lifestyle category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Lifestyle/Health</h3>
                    <div className="description">
                      <p>Examples:</p>
                      <ul>
                        <li>Managing Diabetes: Tips and Tricks</li>
                        <li>Fighting Depression: Ways to Win</li>
                        <li>The Benefits of Yoga for Mind and Body</li>
                        <li>Tips for Better Sleep and More Energy</li>
                        <li>Living with Asthma: Coping Strategiesfe</li>
                      </ul>
                    </div>
                  </div>

                  {/* Category 3: Lifestyle/Health */}
                  <div className="category" id="lifestyle">
                    <img src={health} alt="Lifestyle category" style={{ width: '90%', height: '60%', objectFit: 'cover' }} />
                    <h3>Health Concerns</h3>
                    <div className="description">
                      <p>Examples:</p>
                      <ul>
                        <li>Managing Diabetes: Tips and Tricks</li>
                        <li>Fighting Depression: Ways to Win</li>
                        <li>The Benefits of Yoga for Mind and Body</li>
                        <li>Tips for Better Sleep and More Energy</li>
                        <li>Living with Asthma: Coping Strategiesfe</li>
                      </ul>
                    </div>
                  </div>


                  {/* Category 4: Career/Professional Development */}
                  <div class="category" id="professional" style={{ paddingTop: 100 }}>
                    <img src={profession} alt="Professional category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Career/Professional Development</h3>
                    <div class="description">
                      <p>Examples: </p>
                      <ul>
                        <li>Ace Your Next Interview: Top Tips for Nailing the Job</li>
                        <li>Personal Branding in Job Market</li>
                        <li>Effective Time Management in the Workplace</li>
                        <li>Mastering the Art of Negotiation in Your Career</li>
                        <li>Network for Career success</li>
                      </ul>
                    </div>
                  </div>
                  {/* Category 2: Motivational */}
                  <div className="category" id="motivational" style={{ paddingTop: 100 }}>
                    <img src={motivation} alt="Motivational category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Motivational</h3>
                    <div className="description">
                      <p>Examples:</p>
                      <ul>
                        <li>Believe in yourself and conquer your fears</li>
                        <li>Embrace the power of positive thinking</li>
                        <li>Small steps lead to big achievements</li>
                        <li>Revive passion: Beat burnout</li>
                        <li>Motivational Strategies for Entrepreneurs</li>
                        <li>Exam success motivation tips</li>
                      </ul>
                    </div>
                  </div>

                  {/* Category 6: Humorous/Satirical */}
                  <div class="category" id="humorous" style={{ paddingTop: 100 }}>
                    <img src={humorous} alt="Humorous category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Humorous/Satiricial</h3>
                    <div class="description">
                      <p>Examples: </p>
                      <ul>
                        <li>The Joy of Procrastination</li>
                        <li>Silly But True: A Humorous Take on Reality</li>
                        <li>The Benefits of Incorporating Humor into Your Life</li>
                        <li>A Guide to Navigating Office Politics with a Sense of Humor</li>
                        <li> Celebrating Our Imperfections with a Laugh</li>
                        <li>The crasy old couple</li>
                      </ul>
                    </div>
                  </div>
                  {/* Category 7: Financial */}
                  <div class="category" id="financial" style={{ paddingTop: 100 }}>
                    <img src={money} alt="Financial category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Financial</h3>
                    <div class="description">
                      <p>Examples:</p>
                      <ul>
                        <li>How to Manage Your Finances Effectively</li>
                        <li>How to Grow Your Wealth in 2023</li>
                        <li>Retirement Planning</li>
                        <li>Rising Above Debt</li>
                        <li>Maximizing Your Savings: The Benefits of Budgeting</li>
                      </ul>
                    </div>
                  </div>
                  {/* Category 8: Educational */}
                  <div class="category" id="educational" style={{ paddingTop: 100 }}>
                    <img src={education} alt="Educational category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Educational</h3>
                    <div class="description">
                      <p>Examples: </p>
                      <ul>
                        <li>Study Techniques for Effective Learning</li>
                        <li>Top Resources for Online Learning</li>
                        <li>How to Choose the Right College Major</li>
                        <li>Mastering the Art of Public Speaking</li>
                        <li>Overcoming Test Anxiety</li>
                      </ul>
                    </div>
                  </div>
                  {/* Category 9: Food/Recipe */}
                  <div class="category" id="food" style={{ paddingTop: 100 }}>
                    <img src={food} alt="Food category" style={{ width: '70%', height: '60%', objectFit: 'cover' }} />
                    <h3>Food/Recipe</h3>
                    <div class="description">
                      <p>Examples:</p>
                      <ul>
                        <li>Plant-Based Meals to Keep You Energized</li>
                        <li>How to Make the Perfect Cup of Coffee at Home</li>
                        <li>Creative Ways to Use Leftover Thanksgiving Turkey</li>
                        <li>Healthy Meal Prep Ideas for the Week</li>
                        <li>Vegetarian and Vegan Recipes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="redtest" style={{ paddingTop: 100 }}><i><b>Share the love! If you find our website helpful, please share it with others who might benefit from it:</b></i></h3>
                {/* Social media buttons */}
                {/* Include your social media button elements here */}
              </td>
            </tr>

          </tbody>
        </table>
        {/* Footer content */}
      </div>

      <section>
        {/* Navigation buttons */} &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

        <Link to="/books/get" className="btn btn-primary" >
       Explore Books
        </Link>
      </section>
    </div>
  );
};

export default Home;