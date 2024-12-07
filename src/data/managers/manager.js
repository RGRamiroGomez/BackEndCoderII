export class Manager {
    constructor(model) {
        this.model=model
    }

    create = async (data) =>{
        try{
            const result = await this.model.create(data);
            return result;
        }catch(error){
            throw error;
        }
        
    }
    readByEmail = async (email) =>{
        try {
            const result = await this.model.findOne({email});
            return result;
        } catch (error) {
            throw error;
        }
    }
    readById=async (id)=>{
        try{
            const result = await this.model.findById(id);
            return result;
        }catch(error){
            throw error;
        }
    }

    read = async () => {
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (error) {
            throw error;
        }
    }
    delete = async (id) => {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}