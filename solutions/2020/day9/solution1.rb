limit = 25
previous_nums = []
previous_nums_hash = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  current_num = line.to_i
  previous_nums << current_num
  previous_nums_hash[current_num] = 1

  next if previous_nums.size <= limit

  if previous_nums[0...-1].none? { |previous_num| previous_nums_hash[current_num - previous_num] }
    puts current_num
    break
  end

  dropped_num = previous_nums.shift
  previous_nums_hash.delete(dropped_num)
end