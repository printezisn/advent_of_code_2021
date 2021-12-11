def can_be_contained?(holder, bag, rules)
  return true if holder == bag

  rules[holder].any? { |contained_bag,| can_be_contained?(contained_bag, bag, rules) }
end

rules = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  holding_bag, contained_bags = line.chomp.split('contain')

  holding_bag = holding_bag.match(/([a-z ]+) bags/).to_a[1]
  rules[holding_bag] = []

  unless contained_bags.include?('no other bags')
    contained_bags.split(',').each do |contained_bag|
      total, contained_bag = contained_bag.match(/(\d+) ([a-z ]+) bag/).to_a.drop(1)
      rules[holding_bag] << [contained_bag, total.to_i]
    end
  end
end

total = rules.keys.reject { |holder| holder == 'shiny gold' }
                  .count { |holder| can_be_contained?(holder, 'shiny gold', rules) }

puts total
