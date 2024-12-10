import { ref } from "vue";

export function useTopic() {
  const selectedTopic = useState('selectedTopic'); 


  const chooseTopic = (topic: string) => {
    selectedTopic.value =
      topic.charAt(0).toUpperCase() + topic.split(" ")[0].slice(1).toLowerCase();
  };

  return {
    selectedTopic,
    chooseTopic,
  };
}
