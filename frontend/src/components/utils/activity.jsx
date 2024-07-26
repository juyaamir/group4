

const Activity = (handleActivity) => {
  return (
    <fieldset className="border p-2 rounded-lg">
            <legend className="text-center ">Choose Activities</legend>
            <div className="text-6xl text-blue-400 flex flex-wrap gap-2">
              <div>
                <input type="checkbox" id="swimming" name="Swimming" onChange={handleActivity} />
                <label htmlFor="swimming" title='swimming'><i className=" p-1 fa-solid fa-person-swimming"></i></label>
              </div>
              <div>
                <input type="checkbox" id="hiking" name="Hiking" onChange={handleActivity} />
                <label htmlFor="hiking" title='hiking'><i className=" p-1 fa-solid fa-person-hiking"></i></label>
              </div>
              <div>
                <input type="checkbox" id="cycling" name="Cycling" onChange={handleActivity}/>
                <label htmlFor="cycling" title='cycling'><i className=" p-1 fa-solid fa-person-biking"></i></label>
              </div>
              <div>
                <input type="checkbox" id="skiing" name="Skiing" onChange={handleActivity} />
                <label htmlFor="skiing" title='skiing'><i className=" p-1 fa-solid fa-person-skiing"></i></label>
              </div>
              <div>
                <input type="checkbox" id="snowboarding" name="Snowboarding" onChange={handleActivity} />
                <label htmlFor="snowboarding" title='snowboarding'><i className="p-1 fa-solid fa-person-snowboarding"></i></label>
              </div>
              <div>
                <input type="checkbox" id="camping" name="Camping" onChange={handleActivity} />
                <label htmlFor="camping" title='camping'><i className="p-1 fa-solid fa-fire"></i></label>
              </div>
              <div>
                <input type="checkbox" id="beach" name="Beach" onChange={handleActivity} />
                <label htmlFor="beach" title='beach'><i className="p-1 fa-solid fa-umbrella-beach"></i></label>
              </div>
              <div>
                <input type="checkbox" id="running" name="Running" onChange={handleActivity} />
                <label htmlFor="running" title='running'><i className="p-1 fa-solid fa-person-running"></i></label>
              </div>
              <div>
                <input type="checkbox" id="photography" name="Photography" onChange={handleActivity} />
                <label htmlFor="photography" title='photography'><i className="p-1 fa-solid fa-camera"></i></label>
              </div>
            </div>
          </fieldset>
  )
}

export default Activity